import express from 'express';
import userController from './user.controller';

const userRouter = express.Router();

userRouter.param('id', userController.findByIdParam);

userRouter
  .route('/')
  .get(userController.getAll)
  .post(userController.createOne);

userRouter
  .route('/:id')
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.deleteOne);

export default userRouter;
