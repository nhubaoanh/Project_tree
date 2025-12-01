import { Router } from "express";
import nguoiDungRouter from "./nguoidungRouter";
import thanhVienRouter from "./thanhVienRouter";

const router = Router();
router.use('/users', nguoiDungRouter);
router.use('/member', thanhVienRouter);

export default router;