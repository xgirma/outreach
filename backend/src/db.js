import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
require('dotenv').config();

const connect = () => mongoose.connect(process.env.MONGODB_URL);

export default connect;
