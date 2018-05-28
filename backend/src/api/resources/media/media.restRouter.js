import express from 'express';
import mediaController from './media.controller';

const mediaRouter = express.Router();

mediaRouter.param('id', mediaController.findByIdParam);

mediaRouter
  .route('/')
  .get(mediaController.getAll)
  .post(mediaController.createOne);

mediaRouter
  .route('/:id')
  .get(mediaController.getOne)
  .put(mediaController.updateOne)
  .delete(mediaController.deleteOne);

export default mediaRouter;
