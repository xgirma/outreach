import bodyParser from 'body-parser';

const setGlobalMiddleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: process.env.BODY_LIMIT }));
};

export default setGlobalMiddleware;
