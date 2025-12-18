import { Router } from "express";
import { container } from "tsyringe";
import { taiChinhThuController } from "../controllers/taiChinhThuController";

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

taiChinhThuRouter.use((req, res, next) => {
  next();
});
const TaiChinhThuController = container.resolve(taiChinhThuController);

taiChinhThuRouter.post(
  "/search",
  TaiChinhThuController.searchTaiChinhThu.bind(TaiChinhThuController    )
);

export default taiChinhThuRouter;
