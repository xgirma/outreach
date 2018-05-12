import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import Boom from 'boom';
import swaggerDocument from './swagger.json';

import config from './config';
import routes from './routes';

const app = express();
app.server = http.createServer(app);

// middleware

// parse application/json
app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

// passport config

// api routes v1
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
app.use('/api/v1', routes);

app.use(function(err, req, res, next) {
  next(Boom.notFound());
});

app.use(function(err, req, res, next) {
  res.locals.message = err.output.payload.message; // use this if boom is used
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ message: res.locals.message, error: res.locals.error });
});

app.server.listen(config.port);
console.log('Stared on', `${app.server.address().port}`);

export default app;
