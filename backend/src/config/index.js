/* eslint-disable global-require */
import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV;
const baseConfig = {
  port: process.env.PORT,
  secrets: {},
  db: {
    url: process.env.MONGODB_URL,
  },
};
let envConfig = {};

if (env === 'test') {
  envConfig = require('./testing').config;
} else if (env === 'production') {
  envConfig = require('./production').config;
} else {
  envConfig = require('./development').config;
}

export default merge(baseConfig, envConfig);
