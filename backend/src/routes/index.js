import express from 'express';
import middleware from '../middleware';
import initializeDB from '../db';
import info from '../controller/info';

const router = express();

// connect to db
initializeDB(db => {
  // initialize middleware
  router.use(middleware({ db }));

  // api routes v1 (/v1)
  router.use('/info', info({ db }));
});

export default router;
