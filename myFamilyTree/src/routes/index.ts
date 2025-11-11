import { Router } from "express";
import nguoiDungRouter from "./nguoidungRouter";

const router = Router();
router.use('/users', nguoiDungRouter);

export default router;