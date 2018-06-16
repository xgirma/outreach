import express from 'express';
import registerSuperAdmin from './admin.super.controller';
import registerAdmin from './admin.controller';
import { protect } from '../../modules/auth';

const adminRouter = express.Router();
const superAdminRouter = express.Router();

superAdminRouter.route('/').post(registerSuperAdmin);

adminRouter.param('id', registerAdmin.findByIdParam);

adminRouter
  .route('/')
  .post(protect, registerAdmin.registerAdmin)
  .get(protect, registerAdmin.getAdmins);

adminRouter
  .route('/:id')
  .get(protect, registerAdmin.getAdmin)
  .put(protect, registerAdmin.updateAdmin)
  .delete(protect, registerAdmin.deleteAdmin);

export { adminRouter, superAdminRouter };
