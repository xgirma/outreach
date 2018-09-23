/* eslint-disable no-unused-vars, object-curly-newline */
import logger from './logger';

const apiErrorHandler = (err, req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const { stack, message, name } = err;
  const errorCode = err.status || err.name === 'ValidationError' ? 400 : 500;
  const statusMessage = errorCode !== 500 ? 'error' : 'fail';

  logger.error('Error Handler', {
    url,
    errorCode,
    name,
    message,
    statusMessage,
    stack,
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
