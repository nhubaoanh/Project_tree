import { Router } from "express";
import { container } from "tsyringe";
import { dongHoController } from "../controllers/dongHoController";
import { authenticate, adminOnly } from "../middlewares/authMiddleware";

const donghoRouter = Router();

donghoRouter.use((req, res, next) => {
    next();
});

const Lineagecontroller = container.resolve(dongHoController);

donghoRouter.post('/search', authenticate, Lineagecontroller.searchDongHo.bind(Lineagecontroller));
donghoRouter.get('/getAll', authenticate, Lineagecontroller.getAllDongHo.bind(Lineagecontroller));
donghoRouter.get('/:id', authenticate, Lineagecontroller.getDongHoById.bind(Lineagecontroller));
donghoRouter.post('', authenticate, Lineagecontroller.createDongHo.bind(Lineagecontroller));
donghoRouter.put('/:id', authenticate, Lineagecontroller.updateDongHo.bind(Lineagecontroller));
donghoRouter.delete('/:id', authenticate, Lineagecontroller.deleteDongHo.bind(Lineagecontroller));

export default donghoRouter;