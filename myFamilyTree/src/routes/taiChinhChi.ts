import { Router } from "express";
import { container } from "tsyringe";
import { taiChinhChiController } from "../controllers/taiChinhChiController";
import { authenticate, adminOnly } from "../middlewares/authMiddleware";
import multer from "multer";
import path from "path";

const taiChinhChiRouter = Router();

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
    const uniqueName = `chi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`;
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
taiChinhChiRouter.use((err: any, req: any, res: any, next: any) => {
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

const TaiChinhChiController = container.resolve(taiChinhChiController);

// ============================================================================
// ROUTES CŨ
// ============================================================================
taiChinhChiRouter.post(
  "/search",
  authenticate,
  TaiChinhChiController.searchTaiChinhChi.bind(TaiChinhChiController)
);
taiChinhChiRouter.post(
  "/create",
  authenticate,
  TaiChinhChiController.createTaiChinhChi.bind(TaiChinhChiController)
);

taiChinhChiRouter.post(
  "/update",
  authenticate,
  TaiChinhChiController.updateTaiChinhChi.bind(TaiChinhChiController)
);
taiChinhChiRouter.post(
  "/delete",
  authenticate,
  TaiChinhChiController.deleteTaiChinhChi.bind(TaiChinhChiController)
);

// ============================================================================
// ROUTES MỚI - IMPORT/EXPORT
// ============================================================================

// Export template Excel - Tất cả user có thể tải
taiChinhChiRouter.get(
  "/export-template",
  authenticate,
  TaiChinhChiController.exportTemplate.bind(TaiChinhChiController)
);

// Export template có dữ liệu mẫu - Tất cả user có thể tải
taiChinhChiRouter.get(
  "/export-template-with-sample",
  authenticate,
  TaiChinhChiController.exportTemplateWithSample.bind(TaiChinhChiController)
);

// Import Excel - Chỉ admin và thủ đồ
taiChinhChiRouter.post(
  "/import-excel",
  authenticate,
  upload.single('file'), // Chỉ cho phép 1 file với field name 'file'
  TaiChinhChiController.importExcel.bind(TaiChinhChiController)
);

// Import JSON - Chỉ admin và thủ đồ
taiChinhChiRouter.post(
  "/import-json",
  authenticate,
  TaiChinhChiController.importFromJson.bind(TaiChinhChiController)
);


export default taiChinhChiRouter;
