import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import setGlobalMiddleware from './middleware';
import { restRouter } from './api';
import { connect } from './db';
import swaggerDocument from './api/docs/swagger.json';
import logger from './api/modules/logger';

const app = express();

setGlobalMiddleware(app);
connect();

app.use('/api/v1', restRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.use('*', (req, res, next) => {
  const err = {
    id: 'NF404',
    status: 404,
    code: 'ResourceNotFound',
    title: 'Not Found',
    detail: 'The specified resource does not exist.',
    source: {
      ip: req.ip,
      path: req.originalUrl,
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query,
    },
    meta: {},
  };

  next(err);
});

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection is open to ${process.env.MONGODB_URL}`);
});

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose connection error', { err });
});

mongoose.connection.on('disconnected', () => {
  logger.debug('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.debug('Mongoose default connection is disconnected due to application termination');
    process.exit(0);
  });
});

export default app;
