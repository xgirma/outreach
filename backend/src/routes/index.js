import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDB from '../db';
import info from '../controller/info';

const router = express();

// connect to db
initializeDB(db => {
  // initialize middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/info', info({ config, db }));
});

export default router;
