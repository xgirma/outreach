import http from 'http';
import app from './server';
import logger from './api/modules/logger';

const server = http.createServer(app);
let currentApp = app;

server.listen(process.env.PORT, () => {
  logger.info(`Server listening on port ${process.env.PORT}`);
});

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
