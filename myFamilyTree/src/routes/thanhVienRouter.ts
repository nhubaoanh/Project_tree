import { Router } from "express";
import { container } from "tsyringe";
import { thanhVienController } from "../controllers/thanhVienController";

const thanhVienRouter = Router();

thanhVienRouter.use((req, res, next) => {
    next();
});

const thanhvienController = container.resolve(thanhVienController);

thanhVienRouter.get("/getAllMember", thanhvienController.getAllThanhVien.bind(thanhvienController));
thanhVienRouter.post("/create", thanhvienController.createThanhVien.bind(thanhvienController));
thanhVienRouter.post(
  "/createMultiple",
  thanhvienController.createMultipleThanhVien.bind(thanhvienController)
);

export default thanhVienRouter;