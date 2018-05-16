// db config
import mongoose from 'mongoose';
import logger from './config/logger';

require('dotenv').config();

export default callback => {
  const db = mongoose.connect(process.env.MONGODB_URL).catch(err => {
    if (err) {
      const error = {
        id: 'ECONNREFUSED',
        links: {
          about: 'http://mongoosejs.com/docs/connections.html',
        },
        status: 503,
        code: 'Service Unavailable',
        title: err.name,
        detail: err.message,
        source: {
          pointer: '',
          parameter: '',
        },
        meta: {},
      };
      logger.error('err.name', { error });
    }
  });

  db.then(mdb => {
    if (mdb.connection.readyState === 1) {
      const connectionState = mdb.connections[0].states;
      const connectedTo = mdb.connections[0].client.s.url;
      logger.info(`Mongoose connected to ${connectedTo}`, { connectedTo, connectionState });
    }
  });

  callback(db);
};
