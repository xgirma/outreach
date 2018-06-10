import express from 'express';
import existingAdminController from './admin.existing.controller';
import newAdminController from './admin.new.controller';
import { protect } from '../../modules/auth';

const adminRouter = express.Router();
const newAdminRouter = express.Router();

/* new admin user registration */
newAdminRouter.route('/').post(newAdminController);

/* existing admin user */
adminRouter.param('id', existingAdminController.findByIdParam);

adminRouter
  .route('/')
  .get(protect, existingAdminController.getAllAdmin)
  .put(protect, existingAdminController.updateAdmin)
  .delete(protect, existingAdminController.deleteAdmin);

adminRouter
  .route('/:id')
  .get(protect, existingAdminController.getAdmin)
  .put(protect, existingAdminController.updateAdmin)
  .delete(protect, existingAdminController.deleteAdmin);

export { adminRouter, newAdminRouter };
