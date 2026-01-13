import { Router } from "express";
import { container } from "tsyringe";
import { TinTucController } from "../controllers/tinTucController";
import { authenticate, adminOnly } from "../middlewares/authMiddleware";

const tinTucRouter = Router();
const tinTucController = container.resolve(TinTucController);

// Áp dụng enforceDongHo

tinTucRouter.post("/search", authenticate, tinTucController.search.bind(tinTucController));
tinTucRouter.post("/", authenticate, tinTucController.create.bind(tinTucController));
tinTucRouter.post("/delete", authenticate, tinTucController.deleteMultiple.bind(tinTucController));
tinTucRouter.get("/:id", authenticate, tinTucController.getById.bind(tinTucController));
tinTucRouter.put("/:id", authenticate, tinTucController.update.bind(tinTucController));
tinTucRouter.delete("/:id", authenticate, tinTucController.delete.bind(tinTucController));

export default tinTucRouter;
