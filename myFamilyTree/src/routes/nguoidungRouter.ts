import { Router } from "express";
import { container } from "tsyringe";
import { NguoiDungController } from "../controllers/nguoidungController";
const nguoiDungRouter = Router();

nguoiDungRouter.use((req, res, next) => {
  next();
});

const userController = container.resolve(NguoiDungController);

nguoiDungRouter.get(
  "/authorize/:token",
  userController.authorize.bind(userController)
);
nguoiDungRouter.post("/checkuser", userController.checkUser.bind(userController));
nguoiDungRouter.post("/login", userController.loginUser.bind(userController));
nguoiDungRouter.post('/signup', userController.createNguoiDung.bind(userController));
nguoiDungRouter.post('/search', userController.searchUser.bind(userController));
nguoiDungRouter.post('/reset-password', userController.resetPassword.bind(userController));
nguoiDungRouter.post('/insert-user',userController.insertUser.bind(userController));
nguoiDungRouter.post(
  "/update-user",
  userController.updateUser.bind(userController)
);
nguoiDungRouter.post(
  "/update-user-profile",
  userController.UpdateMyProfile.bind(userController)
);
nguoiDungRouter.post(
  "/delete",
  userController.deleteUser.bind(userController)
);




export default nguoiDungRouter;