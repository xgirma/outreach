import express from 'express';
import { infoRouter } from './resources/info/info.restRouter';
import { introRouter } from './resources/intro/intro.restRouter';

export const restRouter = express.Router();

restRouter.use('/info', infoRouter);
restRouter.use('/intro', introRouter);
