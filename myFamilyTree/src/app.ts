import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import path from "path";
import router from "./routes/index";    
import mysql from "mysql2";
import cors from 'cors';
import core_router from "./core/routes";
import { errorHandler } from "./errors/errorHandle";
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files từ thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api-core', core_router);
app.use('/api-core', router)
// Đăng ký middleware xử lý lỗi toàn cục
app.use(errorHandler);
// Middleware tùy chỉnh để xử lý dữ liệu đầu vào
app.use((req: Request, res: Response, next: NextFunction) => {
  // Xử lý dữ liệu đầu vào của request trước khi tiếp tục xử lý
  req.body = escapeRequestBody(req.body);
  next();
});
// Hàm tùy chỉnh để escape dữ liệu đầu vào
function escapeRequestBody(data: any): any {
  // Xử lý và escape dữ liệu theo ý muốn của bạn
  // Ví dụ: sử dụng mysql.escape để escape dữ liệu
  if (typeof data === 'object') {
    for (let key in data) {
      if (typeof data[key] === 'string') {
        data[key] = mysql.escape(data[key]);
      }
    }
  }
  return data;
}
// Xử lý các route không tồn tại
app.use((req , res ) => {
  res.json({ message: 'Không tìm thấy đường dẫn' });
});
export default app