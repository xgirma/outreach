import express from 'express';
import serviceController from './service.controller';

const serviceRouter = express.Router();

serviceRouter.param('id', serviceController.findByIdParam);

serviceRouter
  .route('/')
  .get(serviceController.getAll)
  .post(serviceController.createOne);

serviceRouter
  .route('/:id')
  .get(serviceController.getOne)
  .put(serviceController.updateOne)
  .delete(serviceController.deleteOne);

export default serviceRouter;
