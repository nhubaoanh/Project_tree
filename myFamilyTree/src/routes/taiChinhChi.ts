import { Router } from "express";
import { container } from "tsyringe";
import { taiChinhChiController } from "../controllers/taiChinhChiController";
import taiChinhThuRouter from "./taiChinhThu";
import { taiChinhThuController } from "../controllers/taiChinhThuController";

const taiChinhChiRouter = Router();

taiChinhChiRouter.use((err: any, req: any, res: any, next: any) => {
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
const TaiChinhChiController = container.resolve(taiChinhChiController);

taiChinhChiRouter.post(
  "/search",
  TaiChinhChiController.searchTaiChinhChi.bind(TaiChinhChiController)
);

export default taiChinhChiRouter;
