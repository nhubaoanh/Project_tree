import { Router } from "express";
import { container } from "tsyringe";
import { TaiLieuController } from "../controllers/taiLieuController";
import { authenticate } from "../middlewares";

const taiLieuRouter = Router();
const taiLieuController = container.resolve(TaiLieuController);

// Áp dụng enforceDongHo

taiLieuRouter.post("/search", authenticate, taiLieuController.search.bind(taiLieuController));
taiLieuRouter.post("/delete", authenticate, taiLieuController.deleteMultiple.bind(taiLieuController));
taiLieuRouter.post("/", authenticate, taiLieuController.create.bind(taiLieuController));
taiLieuRouter.get("/:id", authenticate, taiLieuController.getById.bind(taiLieuController));
taiLieuRouter.put("/:id", authenticate, taiLieuController.update.bind(taiLieuController));
taiLieuRouter.delete("/:id", authenticate, taiLieuController.delete.bind(taiLieuController));

export default taiLieuRouter;
