import express, {Request, Response } from "express";
import { container } from "tsyringe";
import { UploadService } from "../services/uploadService";

const uploadRouter = express.Router();
const uploadService = container.resolve(UploadService);

uploadRouter.post('/', uploadService.multerUpload, (req: Request, res: Response) => {
    if(!req.file) {
        res.status(400).json({ success: false, message: 'Không thể upload được file', path: '' });
        return;
    }

    const filePath = req.file.path.replace(/\\/g, '/'); // Chuẩn hóa path cho Windows
    
    // Build full URL using BASE_URL from environment (gateway URL, not backend URL)
    const baseUrl = process.env.BASE_URL;
    const fullUrl = `${baseUrl}/${filePath}`;
    
    res.json({ 
        success: true, 
        path: fullUrl,  // URL đầy đủ qua gateway để lưu vào database
        relativePath: filePath,  // Path tương đối (backup)
        message: '' 
    });
})

export default uploadRouter;