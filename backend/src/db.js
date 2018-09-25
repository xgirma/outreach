import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './api/modules/logger';

mongoose.Promise = global.Promise;
dotenv.config();

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const connect = () => mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection is open to ${mongoose.connection.client.s.url}`);
});

mongoose.connection.on('error', (err) => {
  logger.info('Mongoose connection error', { err });
});

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection is disconnected due to application termination');
    process.exit(0);
  });
});

export default connect;
