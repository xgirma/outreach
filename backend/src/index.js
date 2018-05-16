import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import logger from './config/logger';
import routes from './routes';

require('dotenv').config();

const app = express();
app.server = http.createServer(app);

// middleware

// parse application/json
app.use(bodyParser.json({ limit: process.env.BODY_LIMIT }));

// passport config

// api routes v1
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
app.use('/api/v1', routes);

app.use('*', (req, res, next) => {
  const err = {
    id: 'NF404',
    status: 404,
    code: 'ResourceNotFound',
    title: 'Not Found',
    detail: 'The specified resource does not exist.',
    source: {
      ip: req.ip,
      path: req.originalUrl,
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query,
    },
    meta: {},
  };

  next(err);
});

app.use((err, req, res, next) => {
  const errorCode = err.status || 500;

  if (process.env.NODE_ENV !== 'production') {
    res.locals.error = err;
    res.locals.message = err.title;
  } else {
    res.locals.error = {};
    res.locals.message = 'Something terrible happened';
  }

  logger.error(`${res.locals.message}`, { err });
  res.status(errorCode).send({ errors: [{ code: errorCode, message: res.locals.message }] });
});

app.server.listen(process.env.PORT);

logger.log('info', 'boot :: application started ::', {
  port: app.server.address().port,
  address: app.server.address().address,
  family: app.server.address().family,
  environment: app.settings.env,
});

export default app;
