import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
require('dotenv').config();

export const connect = () => mongoose.connect(process.env.MONGODB_URL);
