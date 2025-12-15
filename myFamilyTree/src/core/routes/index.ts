import { Router } from "express";
import uploadmultiRouter from "./upload-multiRouter";
import uploadRouter from "./uploadRouter";
const core_router = Router();

core_router.use('/upload', uploadRouter);
core_router.use('/upload-multiple', uploadmultiRouter);
export default core_router;