// db config
import mongoose from 'mongoose';
import logger from './config/logger';

require('dotenv').config();

export default (callback) => {
  const db = mongoose.connect(process.env.MONGODB_URL).catch((err) => {
    if (err) {
      const error = {
        id: 'ECONNREFUSED',
        links: { about: 'http://mongoosejs.com/docs/connections.html' },
        status: 503,
        code: 'Service Unavailable',
        title: err.name,
        detail: err.message,
        source: { pointer: '', parameter: '' },
        meta: {},
      };
      logger.error('err.name', { error });
    }
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

  callback(db);
};
