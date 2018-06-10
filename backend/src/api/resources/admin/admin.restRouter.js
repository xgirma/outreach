import express from 'express';
import existingAdminController from './admin.existing.controller';
import newAdminController from './admin.new.controller';
import { protect } from '../../modules/auth';

const adminRouter = express.Router();
const newAdminRouter = express.Router();

/* new user registration */
newAdminRouter.route('/').post(newAdminController);

/* existing user */
adminRouter.param('id', existingAdminController.findByIdParam);
adminRouter.get('/me', protect, existingAdminController.me);

adminRouter.route('/').get(existingAdminController.getAll);

adminRouter
  .route('/:id')
  .get(existingAdminController.getOne)
  .put(existingAdminController.updateOne)
  .delete(existingAdminController.deleteOne);

export { adminRouter, newAdminRouter };
