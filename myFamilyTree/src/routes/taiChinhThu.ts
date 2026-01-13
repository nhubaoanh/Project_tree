import { Router } from "express";
import { container } from "tsyringe";
import { taiChinhThuController } from "../controllers/taiChinhThuController";
import { authenticate, adminOnly } from "../middlewares/authMiddleware";

const taiChinhThuRouter = Router();

taiChinhThuRouter.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Có lỗi xảy ra khi xử lý yêu cầu",
    });
  }
  next();
});

const TaiChinhThuController = container.resolve(taiChinhThuController);

// Áp dụng enforceDongHo

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


export default taiChinhThuRouter;
