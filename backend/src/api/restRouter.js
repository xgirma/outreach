import express from 'express';
import eventRouter from './resources/event/event.restRouter';
import infoRouter from './resources/info/info.restRouter';
import introRouter from './resources/intro/intro.restRouter';

const restRouter = express.Router();

restRouter.use('/event', eventRouter);
restRouter.use('/info', infoRouter);
restRouter.use('/intro', introRouter);

export default restRouter;
