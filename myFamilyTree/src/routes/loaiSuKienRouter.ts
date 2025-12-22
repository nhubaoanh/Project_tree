import { Router } from "express";
import { container } from "tsyringe";
import { loaiSuKienController } from "../controllers/loaiSuKienController";

const loaiSuKienRouter = Router();

loaiSuKienRouter.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Có lỗi xảy ra khi xử lý yêu cầu",
    });
  }
  next();
});

loaiSuKienRouter.use((req, res, next) => {
  next();
});
const eventcontroller = container.resolve(loaiSuKienController);

loaiSuKienRouter.post(
  "/search",
  eventcontroller.searchSuKien.bind(eventcontroller)
);

export default loaiSuKienRouter;
