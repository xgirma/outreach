import express from 'express';
import controllerSuperAdmins from './admins.controller.super';
import controllerAdmins from './admins.controller';

const adminsRouter = express.Router();
const superAdminsRouter = express.Router();

superAdminsRouter.route('/').post(controllerSuperAdmins);

adminsRouter.param('id', controllerAdmins.findByIdParam);

adminsRouter
  .route('/')
  .post(controllerAdmins.registerAdmin)
  .get(controllerAdmins.getAdmins);

adminsRouter
  .route('/:id')
  .get(controllerAdmins.getAdmin)
  .put(controllerAdmins.updateAdmin)
  .delete(controllerAdmins.deleteAdmin);

export { adminsRouter, superAdminsRouter };
