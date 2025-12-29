import { Router } from "express";
import { container } from "tsyringe";
import { TaiLieuController } from "../controllers/taiLieuController";

const taiLieuRouter = Router();
const taiLieuController = container.resolve(TaiLieuController);

// Áp dụng enforceDongHo

taiLieuRouter.post("/search", taiLieuController.search.bind(taiLieuController));
taiLieuRouter.post("/",taiLieuController.create.bind(taiLieuController));
taiLieuRouter.get("/:id",taiLieuController.getById.bind(taiLieuController));
taiLieuRouter.put("/:id", taiLieuController.update.bind(taiLieuController));
taiLieuRouter.delete("/:id", taiLieuController.delete.bind(taiLieuController));

export default taiLieuRouter;
