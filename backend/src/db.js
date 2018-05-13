// db config
import mongoose from 'mongoose';
import { logger, config } from './config';

export default callback => {
  const db = mongoose.connect(config.mongoUrl).catch(err => {
    if (err) {
      logger.error(err);
    }
  });
  callback(db);
};
