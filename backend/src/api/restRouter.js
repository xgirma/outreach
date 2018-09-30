import express from 'express';
import blogRouter from './resources/blog/blog.restRouter';
import eventRouter from './resources/event/event.restRouter';
import infoRouter from './resources/info/info.restRouter';
import introRouter from './resources/intro/intro.restRouter';
import mediaRouter from './resources/media/media.restRouter';
import serviceRouter from './resources/service/service.restRouter';
import { adminsRouter, superAdminsRouter } from './resources/admins/admins.restRouter';
import { verifyUser, protect } from './modules/auth';
import { signinToken } from '../middleware/signin.token';

const restRouter = express.Router();

restRouter.use('/register', superAdminsRouter);
restRouter.use('/signin', verifyUser, signinToken);

restRouter.use('/admins', protect, adminsRouter);
restRouter.use('/blog', protect, blogRouter);
restRouter.use('/event', protect, eventRouter);
restRouter.use('/info', protect, infoRouter);
restRouter.use('/intro', protect, introRouter);
restRouter.use('/media', protect, mediaRouter);
restRouter.use('/service', protect, serviceRouter);

export default restRouter;
