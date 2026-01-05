import { Router } from "express";
import { container } from "tsyringe";
import { taiChinhChiController } from "../controllers/taiChinhChiController";

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

taiChinhChiRouter.use((req, res, next) => {
  next();
});
const TaiChinhChiController = container.resolve(taiChinhChiController);

taiChinhChiRouter.post(
  "/search",
  TaiChinhChiController.searchTaiChinhChi.bind(TaiChinhChiController)
);
taiChinhChiRouter.post(
  "/create",
  TaiChinhChiController.createTaiChinhChi.bind(TaiChinhChiController)
);

taiChinhChiRouter.post(
  "/update",
  TaiChinhChiController.updateTaiChinhChi.bind(TaiChinhChiController)
);
taiChinhChiRouter.post(
  "/delete",
  TaiChinhChiController.deleteTaiChinhChi.bind(TaiChinhChiController)
);


export default taiChinhChiRouter;
