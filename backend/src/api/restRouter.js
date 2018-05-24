import express from 'express';
import { infoRouter } from './resources/info';
import { introRouter } from './resources/intro';

export const restRouter = express.Router();

restRouter.use('/info', infoRouter);
restRouter.use('/intro', introRouter);
