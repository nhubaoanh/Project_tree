import express, {Request, Response } from "express";
import { container } from "tsyringe";
import { UploadMultiService } from "../services/upload-multiService";

const uploadmultiRouter = express.Router();
const uploadMultiService = container.resolve(UploadMultiService);

uploadmultiRouter.post('/', uploadMultiService.multerMultiUpload, (req: Request, res: Response) => {
    if(!req.files || (req.files as Express.Multer.File[]).length === 0) {
        res.status(400).json({ success: false, message: 'Không thể upload được file', paths: [] });
        return;
    }

    const uploadedFiles = req.files as Express.Multer.File[];
    
    // Build full URLs using BASE_URL from environment (gateway URL)
    const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
    const paths = uploadedFiles.map(file => {
        const filePath = file.path.replace(/\\/g, '/');
        return `${baseUrl}/${filePath}`;
    });
    
    res.json({ success: true, paths, message: '' });
});

export default uploadmultiRouter;