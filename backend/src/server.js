import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { restRouter } from './api';
import { NotFound } from './api/modules/error';
import setGlobalMiddleware from './middleware';
import swaggerDocument from './api/docs/swagger.json';
import connect from './db';
import apiErrorHandler from './api/modules/errorHandler';

const cors = require('cors');

const app = express();

app.use(cors());
setGlobalMiddleware(app);
connect();

app.use('/api/v1', restRouter);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('*', (req, res, next) => {
  setImmediate(() => next(NotFound()));
});

app.use(apiErrorHandler);

export default app;
