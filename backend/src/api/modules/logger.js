import winston from 'winston';
import moment from 'moment';

// eslint-disable-next-line
const { MongoDB } = require('winston-mongodb');
require('dotenv').config();

const winstonOptions = {
  console: {
    level: process.env.CONSOLE_LOG_LEVEL,
    colorize: true,
    timestamp: () => {
      const today = moment();
      return today.format('MM-DD-YYYY HH:mm:ssa');
    },
    prettyPrint: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
  },
  mongodb: {
    name: 'all',
    level: process.env.MONGODB_LOG_LEVEL,
    db: process.env.MONGODB_URL,
    collection: process.env.MONGODB_COLLECTION_INFO,
    storeHost: true,
    tryReconnect: true,
    decolorize: true,
  },
  errordb: {
    name: 'error-only',
    level: 'error',
    db: process.env.MONGODB_URL,
    collection: process.env.MONGODB_COLLECTION_ERROR,
    storeHost: true,
    tryReconnect: true,
    decolorize: true,
  },
};

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console(winstonOptions.console),
    new winston.transports.MongoDB(winstonOptions.mongodb),
    new winston.transports.MongoDB(winstonOptions.errordb),
  ],
  exitOnError: false,
});

export default logger;
