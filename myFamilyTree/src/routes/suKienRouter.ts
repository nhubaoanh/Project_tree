import { Router } from "express";
import { container } from "tsyringe";
import { suKienController } from "../controllers/suKienController";

const suKienRouter = Router();

suKienRouter.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Có lỗi xảy ra khi xử lý yêu cầu",
    });
  }
  next();
});

suKienRouter.use((req, res, next) => {
  next();
});
const eventcontroller = container.resolve(suKienController);

suKienRouter.post("/search", eventcontroller.searchSuKien.bind(eventcontroller));
export default suKienRouter;