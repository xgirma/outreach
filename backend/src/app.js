import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from './config'
import routes from './routes'

let app = express();
app.server = http.create(app);

// middleware

// passport config

// api routes v1
app.use('/v1', routes);

app.server.listen(config.port);
console.log('Stared on', ${app.server.address().port});

export default app;
