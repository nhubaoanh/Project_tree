import { Router } from "express";
import { container } from "tsyringe";
import { ThongKeController } from "../controllers/thongKeController";

const thongKeRouter = Router();
const controller = container.resolve(ThongKeController);

// Dashboard stats (có thể filter theo dongHoId)
thongKeRouter.get("/dashboard", controller.getDashboardStats.bind(controller));

// Thành viên mới nhất
thongKeRouter.get("/moinhat", controller.getThanhVienMoiNhat.bind(controller));

// Thống kê tổng quan theo dòng họ
thongKeRouter.get("/tongquan/:dongHoId", controller.getThongKeTongQuan.bind(controller));

// Thống kê theo đời
thongKeRouter.get("/theodoi/:dongHoId", controller.getThongKeoTheoDoi.bind(controller));

// Thống kê theo chi
thongKeRouter.get("/theochi/:dongHoId", controller.getThongKeoTheoChi.bind(controller));

// Lấy tất cả thống kê
thongKeRouter.get("/full/:dongHoId", controller.getFullStats.bind(controller));

// ========== TÀI CHÍNH ==========
// Thống kê thu chi tổng quan
thongKeRouter.get("/thuChi/:dongHoId", controller.getThongKeThuChi.bind(controller));

// Thống kê thu chi theo tháng
thongKeRouter.get("/thuChiTheoThang/:dongHoId", controller.getThongKeThuChiTheoThang.bind(controller));

// Khoản thu gần đây
thongKeRouter.get("/thuGanDay", controller.getThuGanDay.bind(controller));

// Khoản chi gần đây
thongKeRouter.get("/chiGanDay", controller.getChiGanDay.bind(controller));

// ========== SỰ KIỆN ==========
// Thống kê sự kiện
thongKeRouter.get("/suKien/:dongHoId", controller.getThongKeSuKien.bind(controller));

// Sự kiện sắp tới
thongKeRouter.get("/suKienSapToi", controller.getSuKienSapToi.bind(controller));

export default thongKeRouter;
