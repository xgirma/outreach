import express from 'express';
import userController from './user.controller';
import newUserController from './new.user.controller';
import { protect } from '../../modules/auth';

const userRouter = express.Router();
const newUserRouter = express.Router();

/* new user registration */
newUserRouter.route('/').post(newUserController);

/* existing user */
userRouter.param('id', userController.findByIdParam);
userRouter.get('/me', protect, userController.me);

userRouter.route('/').get(userController.getAll);

userRouter
  .route('/:id')
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.deleteOne);

export { userRouter, newUserRouter };
