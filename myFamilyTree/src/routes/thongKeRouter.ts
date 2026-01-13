import { Router } from "express";
import { container } from "tsyringe";
import { ThongKeController } from "../controllers/thongKeController";
import { authenticate, adminOnly } from "../middlewares/authMiddleware";

const thongKeRouter = Router();
const controller = container.resolve(ThongKeController);

// Dashboard stats (có thể filter theo dongHoId)
thongKeRouter.get("/dashboard", authenticate, controller.getDashboardStats.bind(controller));

// Thành viên mới nhất
thongKeRouter.get("/moinhat", authenticate, controller.getThanhVienMoiNhat.bind(controller));

// Thống kê tổng quan theo dòng họ
thongKeRouter.get(
  "/tongquan/:dongHoId",
  authenticate,
  controller.getThongKeTongQuan.bind(controller)
);

// Thống kê theo đời
thongKeRouter.get("/theodoi/:dongHoId", authenticate, controller.getThongKeoTheoDoi.bind(controller));
// Thống kê theo chi
thongKeRouter.get("/theochi/:dongHoId", authenticate, controller.getThongKeoTheoChi.bind(controller));

// Lấy tất cả thống kê
thongKeRouter.get("/full/:dongHoId", authenticate, controller.getFullStats.bind(controller));

// ========== TÀI CHÍNH ==========
// Thống kê thu chi tổng quan
thongKeRouter.get("/thuChi/:dongHoId", authenticate, controller.getThongKeThuChi.bind(controller));

// Thống kê thu chi theo tháng
thongKeRouter.get("/thuChiTheoThang/:dongHoId", authenticate, controller.getThongKeThuChiTheoThang.bind(controller));

// Khoản thu gần đây
thongKeRouter.get("/thuGanDay", authenticate, controller.getThuGanDay.bind(controller));

// Khoản chi gần đây
thongKeRouter.get("/chiGanDay", authenticate, controller.getChiGanDay.bind(controller));

// ========== SỰ KIỆN ==========
// Thống kê sự kiện
thongKeRouter.get("/suKien/:dongHoId", authenticate, controller.getThongKeSuKien.bind(controller));
// Sự kiện sắp tới
thongKeRouter.get("/suKienSapToi", authenticate, controller.getSuKienSapToi.bind(controller));

export default thongKeRouter;
