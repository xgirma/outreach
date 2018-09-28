import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import helmet from 'helmet';
import logger from './api/modules/logger';

const setGlobalMiddleware = (app) => {
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: process.env.BODY_LIMIT }));
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(morgan('combined', { stream: logger.stream }));
};

export default setGlobalMiddleware;
