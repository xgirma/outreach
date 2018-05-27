import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

const connect = () => mongoose.connect(process.env.MONGODB_URL);

export default connect;
