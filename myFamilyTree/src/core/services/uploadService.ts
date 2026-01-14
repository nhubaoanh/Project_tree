import { injectable } from "tsyringe";
import multer from "multer";
import path from "path";
import fs from "fs";

// Giới hạn kích thước file (bytes)
const FILE_SIZE_LIMITS = {
    IMAGE: 5 * 1024 * 1024, // 5MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
    MAX: 50 * 1024 * 1024, // 50MB
};

// Các loại file được phép
const ALLOWED_FILE_TYPES = {
    IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    DOCUMENT: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
    ],
};

@injectable()
export class UploadService {
    private upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const data = new Date();
                const year = data.getFullYear().toString();
                const month = (data.getMonth() + 1).toString().padStart(2, '0');
                const day = data.getDate().toString().padStart(2, '0');
                const uploadDir = `uploads/${year}/${month}/${day}`;
                if(!fs.existsSync(uploadDir)){
                    fs.mkdirSync(uploadDir, {recursive: true});
                }
                cb(null, uploadDir);
            },
            filename:(req, file, cb) => {
                // Sanitize filename: remove special characters
                const originalName = path.parse(file.originalname).name
                    .replace(/[^a-zA-Z0-9_-]/g, '_')
                    .substring(0, 50); // Giới hạn độ dài tên file
                const filename = originalName + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
                const extension = path.extname(file.originalname);
                cb(null, filename + extension);
            },
        }),
        limits: {
            fileSize: FILE_SIZE_LIMITS.MAX, // Giới hạn tối đa
        },
        fileFilter: (req, file, cb) => {
            // Kiểm tra loại file
            const allAllowedTypes = [...ALLOWED_FILE_TYPES.IMAGE, ...ALLOWED_FILE_TYPES.DOCUMENT];
            
            if (allAllowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error(`Loại file không được hỗ trợ: ${file.mimetype}`));
            }
        },
    }).single('file');

    get multerUpload() {
        return this.upload;
    }
}
