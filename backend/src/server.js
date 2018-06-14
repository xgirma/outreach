import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { restRouter } from './api';
import { NOTFUD } from './api/docs/error.codes';
import setGlobalMiddleware from './middleware';
import swaggerDocument from './api/docs/swagger.json';
import connect from './db';
import apiErrorHandler from './api/modules/errorHandler';

const app = express();

setGlobalMiddleware(app);
connect();

app.use('/api/v1', restRouter);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('*', (req, res, next) => {
  setImmediate(() => next(NOTFUD));
});

app.use(apiErrorHandler);

export default app;
