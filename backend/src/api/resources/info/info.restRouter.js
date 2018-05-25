import express from 'express';
import infoController from './info.controller';

const infoRouter = express.Router();

infoRouter.param('id', infoController.findByParam);

infoRouter
  .route('/')
  .get(infoController.getAll)
  .post(infoController.createOne);

infoRouter
  .route('/:id')
  .get(infoController.getOne)
  .put(infoController.updateOne)
  .delete(infoController.deleteOne);

export default infoRouter;
