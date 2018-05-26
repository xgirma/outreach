import express from 'express';
import eventController from './event.controller';

const eventRouter = express.Router();

eventRouter.param('id', eventController.findByIdParam);
eventRouter.param('date', eventController.findByDateParam);

eventRouter
  .route('/')
  .get(eventController.getAll)
  .post(eventController.createOne);

eventRouter.route('/past').get(eventController.getPast);
eventRouter.route('/future').get(eventController.getFuture);

eventRouter
  .route('/:id')
  .get(eventController.getOne)
  .put(eventController.updateOne)
  .delete(eventController.deleteOne);

export default eventRouter;
