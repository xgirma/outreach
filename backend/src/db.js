// db config
import mongoose from 'mongoose';
import config from './config';

export default callback => {
  const db = mongoose.connect(config.mongoUrl).catch(err => {
    console.log(err);
  });
  callback(db);
};
