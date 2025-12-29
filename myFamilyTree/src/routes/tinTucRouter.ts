import { Router } from "express";
import { container } from "tsyringe";
import { TinTucController } from "../controllers/tinTucController";

const tinTucRouter = Router();
const tinTucController = container.resolve(TinTucController);

tinTucRouter.post("/search", tinTucController.search.bind(tinTucController));
tinTucRouter.post("/", tinTucController.create.bind(tinTucController));
tinTucRouter.get("/:id", tinTucController.getById.bind(tinTucController));
tinTucRouter.put("/:id", tinTucController.update.bind(tinTucController));
tinTucRouter.delete("/:id", tinTucController.delete.bind(tinTucController));

export default tinTucRouter;
