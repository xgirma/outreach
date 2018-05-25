import express from 'express';
import introController from './intro.controller';

const introRouter = express.Router();

introRouter.param('id', introController.findByParam);

introRouter
  .route('/')
  .get(introController.getAll)
  .post(introController.createOne);

introRouter
  .route('/:id')
  .get(introController.getOne)
  .put(introController.updateOne)
  .delete(introController.deleteOne);

export default introRouter;
