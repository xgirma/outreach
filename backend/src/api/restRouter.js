import express from 'express';
import { infoRouter } from './resources/info';

export const restRouter = express.Router();

restRouter.use('/info', infoRouter);
