import { Router } from "express";
import { container } from "tsyringe";
import { suKienController } from "../controllers/suKienController";
import { authenticate, adminOnly } from "../middlewares/authMiddleware";

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

const eventcontroller = container.resolve(suKienController);

suKienRouter.post(
  "/search",
  authenticate,
  eventcontroller.searchSuKien.bind(eventcontroller)
);
suKienRouter.post(
  "/create",
  authenticate,
  eventcontroller.createSuKien.bind(eventcontroller)
);
suKienRouter.post(
  "/update",
  authenticate,
  eventcontroller.updateSuKien.bind(eventcontroller)
);

suKienRouter.post(
  "/delete",
  authenticate,
  eventcontroller.deleteSuKien.bind(eventcontroller)
);

export default suKienRouter;
