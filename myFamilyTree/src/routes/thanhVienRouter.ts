import { Router } from "express";
import { container } from "tsyringe";
import { thanhVienController } from "../controllers/thanhVienController";

const thanhVienRouter = Router();

thanhVienRouter.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Có lỗi xảy ra khi xử lý yêu cầu'
    });
  }
    next();
});

thanhVienRouter.use((req, res, next) => {
  next();
});
const thanhviencontroller = container.resolve(thanhVienController);

thanhVienRouter.get("/getAllMember", thanhviencontroller.getAllThanhVien.bind(thanhviencontroller));
thanhVienRouter.get('/export-template', thanhviencontroller.exportTemplate.bind(thanhviencontroller))
thanhVienRouter.post("/create", thanhviencontroller.createThanhVien.bind(thanhviencontroller));
thanhVienRouter.post(
  "/createMultiple",
  thanhviencontroller.createMultipleThanhVien.bind(thanhviencontroller)
);
thanhVienRouter.post('/search', thanhviencontroller.searchThanhVien.bind(thanhviencontroller));

thanhVienRouter.post('/import-excel', thanhviencontroller.importFromExcel.bind(thanhviencontroller))
thanhVienRouter.post('/update', thanhviencontroller.updateMultipleThanhVien.bind(thanhviencontroller))
export default thanhVienRouter;