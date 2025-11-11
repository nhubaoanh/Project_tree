import express, {Request, Response} from "express";
import "reflect-metadata";
import router from "./routes/index";    
import mysql from "mysql2";
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api-core', router)

// // Xử lý các route không tồn tại
// app.use((req, res) => {
//   res.status(404).json({ message: "Không tìm thấy đường dẫn" });
// });


export default app