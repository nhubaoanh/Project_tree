import { Router } from "express";
import { container } from "tsyringe";
import { NguoiDungController } from "../controllers/nguoidungController";
const nguoiDungRouter = Router();

nguoiDungRouter.use((req, res, next) => {
  console.log("NguoiDungRouter hit:", req.method, req.path);
  next();
});

const userController = container.resolve(NguoiDungController);
nguoiDungRouter.post("/login", userController.loginUser.bind(userController));
nguoiDungRouter.post('/signup', userController.createNguoiDung.bind(userController));
nguoiDungRouter.post('/search', userController.searchUser.bind(userController));


export default nguoiDungRouter;