import { Router } from "express";
import { container } from "tsyringe";
import { taiChinhThuController } from "../controllers/taiChinhThuController";
import { authenticate, adminOnly } from "../middlewares/authMiddleware";
import multer from "multer";
import path from "path";

const taiChinhThuRouter = Router();

// ============================================================================
// MULTER CONFIG CHO UPLOAD EXCEL
// ============================================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads', 'imports');
    // Tạo thư mục nếu chưa tồn tại
    const fs = require('fs');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `thu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  // Chỉ cho phép file Excel
  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel' // .xls
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép file Excel (.xlsx, .xls)'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1 // Chỉ cho phép 1 file
  }
});

// ============================================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================================
taiChinhThuRouter.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File quá lớn. Kích thước tối đa 10MB'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Chỉ được upload 1 file'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Chỉ được chọn 1 file Excel'
      });
    }
  }
  
  if (err.message === 'Chỉ cho phép file Excel (.xlsx, .xls)') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Có lỗi xảy ra khi xử lý yêu cầu",
    });
  }
  next();
});

const TaiChinhThuController = container.resolve(taiChinhThuController);

// ============================================================================
// ROUTES CŨ
// ============================================================================
taiChinhThuRouter.post(
  "/search",
  authenticate,
  TaiChinhThuController.searchTaiChinhThu.bind(TaiChinhThuController)
);
taiChinhThuRouter.post(
  "/create",
  authenticate,
  TaiChinhThuController.createTaiChinhThu.bind(TaiChinhThuController)
);
taiChinhThuRouter.post(
  "/update",
  authenticate,
  TaiChinhThuController.updateTaiChinhThu.bind(TaiChinhThuController)
);
taiChinhThuRouter.post(
  "/delete",
  authenticate,
  TaiChinhThuController.deleteTaiChinhThu.bind(TaiChinhThuController)
);

// ============================================================================
// ROUTES MỚI - IMPORT/EXPORT
// ============================================================================

// Export template Excel - Tất cả user có thể tải
taiChinhThuRouter.get(
  "/export-template",
  authenticate,
  TaiChinhThuController.exportTemplate.bind(TaiChinhThuController)
);

// Export template có dữ liệu mẫu - Tất cả user có thể tải
taiChinhThuRouter.get(
  "/export-template-with-sample",
  authenticate,
  TaiChinhThuController.exportTemplateWithSample.bind(TaiChinhThuController)
);

// Import Excel - Chỉ admin và thủ đồ
taiChinhThuRouter.post(
  "/import-excel",
  authenticate,
  upload.single('file'), // Chỉ cho phép 1 file với field name 'file'
  TaiChinhThuController.importExcel.bind(TaiChinhThuController)
);

// Import JSON - Chỉ admin và thủ đồ
taiChinhThuRouter.post(
  "/import-json",
  authenticate,
  TaiChinhThuController.importFromJson.bind(TaiChinhThuController)
);

export default taiChinhThuRouter;
