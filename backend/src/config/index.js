import winston from 'winston';
import moment from 'moment';
require('winston-mongodb');

const config = {
  port: 3005,
  mongoUrl: 'mongodb://localhost:27017/admin',
  bodyLimit: '100kb'
};

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: () => {
      const today = moment();
      return today.format('MM-DD-YYYY h:mm:ssa');
    }
  },
  database: {
    db: config.mongoUrl,
    collection: 'log',
    storeHost: true,
    capped: true,
    cappedMax: 1000000
  }
};

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.MongoDB(options.database),
  ],
  exitOnError: false,
  meta: true,
  msg:
    'HTTP: {{req.method}} {{req.url}} | STATUS: {{res.statusCode}} | TIME: {{res.responseTime}}ms'
});

if (process.env.NODE_ENV === 'production') {
  options.console.level = 'info';
}

export { logger, config };
