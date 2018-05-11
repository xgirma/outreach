import { Router } from 'express';
import winston from 'winston';
import winstonExpress from 'express-winston';
require('winston-mongodb');
import config from '../config';

export default ({ config, db }) => {
  const api = Router();

  // add middleware
  
  // transport log
  api.use(winstonExpress.logger({
    transports: [
      new winston.transports.MongoDB({
        db: config.mongoUrl,
        collection: 'log',
        storeHost: true,
        capped: true,
        cappedMax: 1000000
      })
    ],
    meta: true,
    msg: 'HTTP: {{req.method}} {{req.url}} | STATUS: {{res.statusCode}} | TIME: {{res.responseTime}}ms'
  }));

  return api;
};
