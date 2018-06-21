import express from 'express';
import registerSuperAdmins from './admins.super.controller';
import registerAdmins from './admins.controller';
import { protect } from '../../modules/auth';

const adminsRouter = express.Router();
const superAdminsRouter = express.Router();

superAdminsRouter.route('/').post(registerSuperAdmins);

adminsRouter.param('id', registerAdmins.findByIdParam);

adminsRouter
  .route('/')
  .post(protect, registerAdmins.registerAdmin)
  .get(protect, registerAdmins.getAdmins);

adminsRouter
  .route('/:id')
  .get(protect, registerAdmins.getAdmin)
  .put(protect, registerAdmins.updateAdmin)
  .delete(protect, registerAdmins.deleteAdmin);

export { adminsRouter, superAdminsRouter };
