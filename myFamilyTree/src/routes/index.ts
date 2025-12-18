import { Router } from "express";
import nguoiDungRouter from "./nguoidungRouter";
import thanhVienRouter from "./thanhVienRouter";
import donghoRouter from "./dongHoRouter";
import roleRouter from "./roleRouter";
import suKienRouter from "./suKienRouter";
import taiChinhThuRouter from "./taiChinhThu";
import taiChinhChiRouter from "./taiChinhChi";

const router = Router();
router.use('/users', nguoiDungRouter);
router.use('/member', thanhVienRouter);
router.use('/lineage', donghoRouter);
router.use('/role', roleRouter);
router.use("/event", suKienRouter);
router.use("/contributionUp", taiChinhThuRouter);
router.use("/contributionDown", taiChinhChiRouter);

export default router;