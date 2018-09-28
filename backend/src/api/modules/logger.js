import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const winstonOptions = {
  console: {
    level: process.env.LOG_LEVEL,
    colorize: true,
    prettyPrint: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    json: false,
  },
};

const logger = new winston.Logger({
  transports: [new winston.transports.Console(winstonOptions.console)],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.silly(message);
  },
};

export default logger;
