import express from 'express';
import blogRouter from './resources/blog/blog.restRouter';
import eventRouter from './resources/event/event.restRouter';
import infoRouter from './resources/info/info.restRouter';
import introRouter from './resources/intro/intro.restRouter';
import mediaRouter from './resources/media/media.restRouter';
import serviceRouter from './resources/service/service.restRouter';
import { adminRouter } from './resources/admin/admin.restRouter';

const restRouter = express.Router();

restRouter.use('/admin', adminRouter);
restRouter.use('/blog', blogRouter);
restRouter.use('/event', eventRouter);
restRouter.use('/info', infoRouter);
restRouter.use('/intro', introRouter);
restRouter.use('/media', mediaRouter);
restRouter.use('/service', serviceRouter);

export default restRouter;
