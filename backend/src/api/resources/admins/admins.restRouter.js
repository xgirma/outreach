import express from 'express';
import controllerSuperAdmins from './admins.controller.super';
import controllerAdmins from './admins.controller';
import { protect } from '../../modules/auth';

const adminsRouter = express.Router();
const superAdminsRouter = express.Router();

superAdminsRouter.route('/').post(controllerSuperAdmins);

adminsRouter.param('id', controllerAdmins.findByIdParam);

adminsRouter
  .route('/')
  .post(protect, controllerAdmins.registerAdmin)
  .get(protect, controllerAdmins.getAdmins);

adminsRouter
  .route('/:id')
  .get(protect, controllerAdmins.getAdmin)
  .put(protect, controllerAdmins.updateAdmin)
  .delete(protect, controllerAdmins.deleteAdmin);

export { adminsRouter, superAdminsRouter };
