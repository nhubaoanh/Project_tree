import { Router } from "express";
import { container } from "tsyringe";
import { dongHoController } from "../controllers/dongHoController";

const donghoRouter = Router();

donghoRouter.use((req, res, next) => {
    next();
});

const Lineagecontroller = container.resolve(dongHoController);

donghoRouter.post('/search', Lineagecontroller.searchDongHo.bind(Lineagecontroller));
donghoRouter.get('/getAll', Lineagecontroller.getAllDongHo.bind(Lineagecontroller));

export default donghoRouter;