import bodyParser from 'body-parser';
import morgan from 'morgan';

const setGlobalMiddleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: process.env.BODY_LIMIT }));
  app.use(morgan('combined'));
};

export default setGlobalMiddleware;
