import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import config from './config';
import routes from './routes';

const app = express();
app.server = http.createServer(app);

// middleware

// parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// passport config

// api routes v1
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
app.use('/v1', routes);

app.server.listen(config.port);
console.log('Stared on', `${app.server.address().port}`);

export default app;
