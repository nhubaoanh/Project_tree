import { Router } from "express";
import { container } from "tsyringe";
import { nguoiDungController } from "../controllers/nguoidungContronller";

const nguoiDungRouter = Router();
const userController = container.resolve(nguoiDungController);

nguoiDungRouter.post('/signUp', userController.createNguoiDung.bind(userController));

export default nguoiDungRouter;