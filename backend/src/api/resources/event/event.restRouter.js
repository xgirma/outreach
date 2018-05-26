import express from 'express';
import eventController from './event.controller';

const eventRouter = express.Router();

eventRouter.param('id', eventController.findByParam);

eventRouter
  .route('/')
  .get(eventController.getAll)
  .post(eventController.createOne);

eventRouter
  .route('/:id')
  .get(eventController.getOne)
  .put(eventController.updateOne)
  .delete(eventController.deleteOne);

export default eventRouter;
