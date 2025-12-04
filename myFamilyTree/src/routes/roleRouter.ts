import { container } from "tsyringe";
import { roleController } from "../controllers/roleController";
import { Router } from "express";

const roleRouter = Router();

roleRouter.use((req, res, next) => {
    next();
});

const quyenControll = container.resolve(roleController);

roleRouter.get("/getAllRole", quyenControll.getAllRole.bind(quyenControll));

export default roleRouter;