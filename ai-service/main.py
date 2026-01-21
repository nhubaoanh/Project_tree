from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from typing import Optional, List
from contextlib import asynccontextmanager
import logging
import uvicorn

from config import API_HOST, API_PORT
from model_loader import model_loader
from sql_generator import sql_generator
from query_executor import query_executor

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

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
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    logger.info("Starting server on " + API_HOST + ":" + str(API_PORT))
    uvicorn.run("main:app", host=API_HOST, port=API_PORT, reload=False, log_level="info")
