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

/* eslint-disable global-require */
if (env === 'test') {
  envConfig = require('./test').config;
} else if (env === 'production') {
  envConfig = require('./production').config;
} else {
  envConfig = require('./development').config;
}
/* eslint-enable global-require */

export default merge(baseConfig, envConfig);
