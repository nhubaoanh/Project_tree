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
donghoRouter.get('/:id', Lineagecontroller.getDongHoById.bind(Lineagecontroller));
donghoRouter.post('', Lineagecontroller.createDongHo.bind(Lineagecontroller));
donghoRouter.put('/:id', Lineagecontroller.updateDongHo.bind(Lineagecontroller));
donghoRouter.delete('/:id', Lineagecontroller.deleteDongHo.bind(Lineagecontroller));

export default donghoRouter;