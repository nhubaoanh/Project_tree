import { Router } from "express";
import nguoiDungRouter from "./nguoidungRouter";

const router = Router();
router.use('/nguoidung', nguoiDungRouter);

export default router;