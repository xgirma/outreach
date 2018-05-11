import { Router } from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
require('winston-mongodb');

export default ({ config, db }) => {
  const api = Router();

  // add middleware

  // transport log
  api.use(
    expressWinston.logger({
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
      msg:
        'HTTP: {{req.method}} {{req.url}} | STATUS: {{res.statusCode}} | TIME: {{res.responseTime}}ms'
    })
  );

  return api;
};
