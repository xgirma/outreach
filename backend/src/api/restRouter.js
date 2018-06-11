import express from 'express';
import blogRouter from './resources/blog/blog.restRouter';
import eventRouter from './resources/event/event.restRouter';
import infoRouter from './resources/info/info.restRouter';
import introRouter from './resources/intro/intro.restRouter';
import mediaRouter from './resources/media/media.restRouter';
import serviceRouter from './resources/service/service.restRouter';
import {adminRouter, newAdminRouter} from './resources/admin/admin.restRouter';
import { verifyUser, signin, protect } from './modules/auth';

const restRouter = express.Router();

restRouter.use('/register', newAdminRouter);
restRouter.use('/signin', verifyUser, signin);

restRouter.use('/admin', protect, adminRouter);
restRouter.use('/blog', protect, blogRouter);
restRouter.use('/event', protect, eventRouter);
restRouter.use('/info', protect, infoRouter);
restRouter.use('/intro', protect, introRouter);
restRouter.use('/media', protect, mediaRouter);
restRouter.use('/service', protect, serviceRouter);

export default restRouter;
