import express from 'express';
import { infoRouter } from './resources/info';
import { apiErrorHandler } from './modules/errorHandler';

export const restRouter = express.Router();

restRouter.use('/info', infoRouter);
restRouter.use(apiErrorHandler);
