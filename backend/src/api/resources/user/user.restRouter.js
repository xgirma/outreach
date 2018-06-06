import express from 'express';
import userController from './user.controller';
import { protect } from '../../modules/auth';

const userRouter = express.Router();

userRouter.param('id', userController.findByIdParam);
userRouter.get('/me', protect, userController.me);

userRouter
  .route('/')
  .get(userController.getAll)
  .post(userController.newUser);

userRouter
  .route('/:id')
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.deleteOne);

export default userRouter;
