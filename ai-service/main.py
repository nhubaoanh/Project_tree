from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from typing import Optional, List
from contextlib import asynccontextmanager
from datetime import datetime
import logging
import uvicorn
import os
import json

from config import API_HOST, API_PORT
from model_loader_finetuned import finetuned_model_loader as model_loader
from sql_generator import sql_generator
from query_executor import query_executor

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ============================================
# LOGGING FUNCTIONS - Thu thập câu hỏi
# ============================================

def ensure_logs_dir():
    """Tạo thư mục logs nếu chưa có"""
    os.makedirs('logs', exist_ok=True)

def log_question(question: str, dongHoId: str):
    """Log câu hỏi vào file"""
    try:
        ensure_logs_dir()
        timestamp = datetime.now().isoformat()
        with open('logs/questions.txt', 'a', encoding='utf-8') as f:
            f.write(f"{timestamp}|{dongHoId}|{question}\n")
    except Exception as e:
        logger.error(f"Error logging question: {e}")

def log_query_result(question: str, sql: str, success: bool, row_count: int, error: str = ""):
    """Log kết quả query vào file JSON"""
    try:
        ensure_logs_dir()
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "question": question,
            "sql": sql,
            "success": success,
            "row_count": row_count,
            "error": error
        }
        
        with open('logs/query_results.jsonl', 'a', encoding='utf-8') as f:
            f.write(json.dumps(log_entry, ensure_ascii=False) + '\n')
    except Exception as e:
        logger.error(f"Error logging result: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting AI Service...")
    model_loader.load_model()
    logger.info("Model loaded!")
    yield
    # Shutdown
    logger.info("Shutting down AI Service...")

app = FastAPI(
    title="AI Text-to-SQL Service",
    version="1.0.0",
    description="Convert Vietnamese questions to SQL queries using Qwen models",
    lifespan=lifespan
)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class QueryRequest(BaseModel):
    question: str
    dongHoId: str
    execute: bool = False

class QueryResponse(BaseModel):
    success: bool
    sql: str
    confidence: float
    data: Optional[List[dict]] = None
    columns: Optional[List[str]] = None
    row_count: Optional[int] = None
    error: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    db_connected: bool

@app.get("/")
async def root():
    """Redirect to API documentation"""
    return RedirectResponse(url="/docs")

@app.get("/health", response_model=HealthResponse)
async def health_check():
    model_loaded = model_loader._model is not None
    db_connected = query_executor.test_connection()
    return {"status": "ok" if (model_loaded and db_connected) else "degraded", "model_loaded": model_loaded, "db_connected": db_connected}

@app.post("/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    try:
        logger.info("Processing: " + request.question)
        result = sql_generator.generate_sql(request.question)
        sql = result["sql"]
        confidence = result["confidence"]
        response = {"success": True, "sql": sql, "confidence": confidence}
        
        if request.execute:
            param_count = sql.count('?')
            params = [request.dongHoId] * param_count
            exec_result = query_executor.execute_query(sql, params)
            if exec_result["success"]:
                response["data"] = exec_result["data"]
                response["columns"] = exec_result["columns"]
                response["row_count"] = exec_result["row_count"]
            else:
                response["success"] = False
                response["error"] = exec_result["error"]
        return response
    except Exception as e:
        logger.error("Error: " + str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/test")
async def test_query(request: QueryRequest):
    try:
        result = sql_generator.generate_sql(request.question)
        return {"success": True, "sql": result["sql"], "confidence": result["confidence"], "raw_output": result["raw_output"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask")
async def ask_simple(request: QueryRequest):
    """
    Simple endpoint - Returns easy-to-read results
    """
    try:
        logger.info(f"📝 Question: {request.question}")
        
        # ✅ LOG QUESTION TO FILE (Thu thập câu hỏi)
        log_question(request.question, request.dongHoId)
        
        # Generate SQL
        result = sql_generator.generate_sql(request.question)
        sql = result["sql"]
        confidence = result["confidence"]
        
        logger.info(f"✅ SQL: {sql}")
        logger.info(f"📊 Confidence: {confidence * 100:.1f}%")
        
        # Execute if requested
        if request.execute:
            param_count = sql.count('?')
            params = [request.dongHoId] * param_count
            exec_result = query_executor.execute_query(sql, params)
            
            if exec_result["success"]:
                data = exec_result["data"]
                logger.info(f"✅ Results: {len(data)} rows")
                
                # ✅ LOG SUCCESS (Thu thập kết quả thành công)
                log_query_result(request.question, sql, True, len(data))
                
                # Format response
                return {
                    "success": True,
                    "question": request.question,
                    "sql": sql,
                    "confidence": f"{confidence * 100:.1f}%",
                    "results": data,
                    "total_rows": len(data),
                    "message": f"Tìm thấy {len(data)} kết quả"
                }
            else:
                # ✅ LOG ERROR (Thu thập lỗi)
                log_query_result(request.question, sql, False, 0, exec_result["error"])
                
                return {
                    "success": False,
                    "question": request.question,
                    "sql": sql,
                    "error": exec_result["error"]
                }
        else:
            return {
                "success": True,
                "question": request.question,
                "sql": sql,
                "confidence": f"{confidence * 100:.1f}%",
                "message": "SQL generated successfully (not executed)"
            }
            
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        # ✅ LOG EXCEPTION
        log_query_result(request.question if 'request' in locals() else "unknown", "", False, 0, str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/logs/questions")
async def get_collected_questions():
    """
    Lấy danh sách câu hỏi đã thu thập
    """
    try:
        ensure_logs_dir()
        
        if not os.path.exists('logs/questions.txt'):
            return {
                "success": True,
                "total": 0,
                "questions": [],
                "message": "Chưa có câu hỏi nào được thu thập"
            }
        
        questions = []
        with open('logs/questions.txt', 'r', encoding='utf-8') as f:
            for line in f:
                parts = line.strip().split('|')
                if len(parts) >= 3:
                    questions.append({
                        "timestamp": parts[0],
                        "dongHoId": parts[1],
                        "question": parts[2]
                    })
        
        return {
            "success": True,
            "total": len(questions),
            "questions": questions[-100:],  # Lấy 100 câu mới nhất
            "message": f"Đã thu thập {len(questions)} câu hỏi"
        }
        
    except Exception as e:
        logger.error(f"Error reading questions: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/logs/results")
async def get_query_results():
    """
    Lấy kết quả các query đã chạy
    """
    try:
        ensure_logs_dir()
        
        if not os.path.exists('logs/query_results.jsonl'):
            return {
                "success": True,
                "total": 0,
                "results": [],
                "message": "Chưa có kết quả nào"
            }
        
        results = []
        with open('logs/query_results.jsonl', 'r', encoding='utf-8') as f:
            for line in f:
                try:
                    results.append(json.loads(line))
                except:
                    pass
        
        # Statistics
        total = len(results)
        success_count = sum(1 for r in results if r.get('success', False))
        error_count = total - success_count
        
        return {
            "success": True,
            "total": total,
            "success_count": success_count,
            "error_count": error_count,
            "accuracy": f"{(success_count / total * 100):.1f}%" if total > 0 else "0%",
            "results": results[-50:],  # Lấy 50 kết quả mới nhất
            "message": f"Đã thu thập {total} kết quả"
        }
        
    except Exception as e:
        logger.error(f"Error reading results: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/dataset/export")
async def export_dataset():
    """
    Export dataset để fine-tune
    Format: questions.json
    """
    try:
        ensure_logs_dir()
        
        if not os.path.exists('logs/query_results.jsonl'):
            raise HTTPException(status_code=404, detail="Chưa có dữ liệu để export")
        
        # Đọc kết quả thành công
        dataset = []
        with open('logs/query_results.jsonl', 'r', encoding='utf-8') as f:
            for line in f:
                try:
                    result = json.loads(line)
                    if result.get('success', False) and result.get('sql'):
                        dataset.append({
                            "id": len(dataset) + 1,
                            "question": result['question'],
                            "sql": result['sql'],
                            "category": "collected",
                            "verified": False,
                            "notes": f"Auto-collected on {result['timestamp']}"
                        })
                except:
                    pass
        
        # Save to dataset folder
        os.makedirs('dataset', exist_ok=True)
        output_file = f'dataset/collected_questions_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(dataset, f, ensure_ascii=False, indent=2)
        
        return {
            "success": True,
            "total": len(dataset),
            "file": output_file,
            "message": f"Đã export {len(dataset)} câu hỏi vào {output_file}"
        }
        
    except Exception as e:
        logger.error(f"Error exporting dataset: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    logger.info("Starting server on " + API_HOST + ":" + str(API_PORT))
    uvicorn.run("main:app", host=API_HOST, port=API_PORT, reload=False, log_level="info")
