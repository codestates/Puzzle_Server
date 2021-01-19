import express from 'express';
import controller from '../controller';
const homeRouter = express.Router();

homeRouter.get('/', controller.home.home)
homeRouter.post('/serach', controller.home.search)
homeRouter.post('/create', controller.home.create)
homeRouter.patch('/update', controller.home.update)
homeRouter.delete('/delete', controller.home.remove)

export default homeRouter