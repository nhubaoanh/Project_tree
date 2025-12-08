import { Router } from "express";
import { container } from "tsyringe";
import { thanhVienController } from "../controllers/thanhVienController";

const thanhVienRouter = Router();

thanhVienRouter.use((req, res, next) => {
    next();
});

const thanhviencontroller = container.resolve(thanhVienController);

thanhVienRouter.get("/getAllMember", thanhviencontroller.getAllThanhVien.bind(thanhviencontroller));
thanhVienRouter.post("/create", thanhviencontroller.createThanhVien.bind(thanhviencontroller));
thanhVienRouter.post(
  "/createMultiple",
  thanhviencontroller.createMultipleThanhVien.bind(thanhviencontroller)
);
thanhVienRouter.post('/search', thanhviencontroller.searchThanhVien.bind(thanhviencontroller));

export default thanhVienRouter;