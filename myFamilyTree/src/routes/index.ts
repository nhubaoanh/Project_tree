import { Router } from "express";
import nguoiDungRouter from "./nguoidungRouter";
import thanhVienRouter from "./thanhVienRouter";
import donghoRouter from "./dongHoRouter";
import roleRouter from "./roleRouter";

const router = Router();
router.use('/users', nguoiDungRouter);
router.use('/member', thanhVienRouter);
router.use('/lineage', donghoRouter);
router.use('/role', roleRouter);

export default router;