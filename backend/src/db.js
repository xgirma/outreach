// db config
import mongoose from 'mongoose';
import { logger } from './config/logger';

require('dotenv').config();

export default callback => {
  const db = mongoose.connect(process.env.MONGODB_URL).catch(err => {
    if (err) {
      logger.error(err);
    }
  });
  callback(db);
};
