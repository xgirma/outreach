/* eslint-disable no-unused-vars, object-curly-newline, no-nested-ternary */
import logger from './logger';

const apiErrorHandler = (err, req, res, next) => {
  const { protocol, method, originalUrl, ip } = req;
  const url = `${protocol}://${req.get('host')}${originalUrl}`;
  const { stack, message, name } = err;
  const errorCode = err.status ? err.status : err.name === 'ValidationError' ? 400 : 500;
  const statusMessage = errorCode !== 500 ? 'error' : 'fail';

  logger.error(`Error Handler:`, {
    1: ip,
    2: method,
    3: url,
    4: errorCode,
    5: name,
    6: message,
    7: statusMessage,
    8: stack,
  });

  if (process.env.NODE_ENV !== 'production') {
    res.locals.error = err;
    res.locals.name = name;
    res.locals.message = message;
    res.locals.status = errorCode;
  } else {
    res.locals.error = {};
    res.locals.message = 'Something terrible happened';
  }
  const { locals } = res;

  res
    .status(errorCode)
    .send({ status: statusMessage, data: { name: locals.name, message: locals.message } });
};

export default apiErrorHandler;
