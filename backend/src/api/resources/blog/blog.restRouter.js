import express from 'express';
import blogController from './blog.controller';

const blogRouter = express.Router();

blogRouter.param('id', blogController.findByIdParam);

blogRouter
  .route('/')
  .get(blogController.getAll)
  .post(blogController.createOne);

blogRouter
  .route('/:id')
  .get(blogController.getOne)
  .put(blogController.updateOne)
  .delete(blogController.deleteOne);

export default blogRouter;
