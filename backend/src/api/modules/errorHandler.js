import logger from './logger';

// eslint-disable-next-line
const apiErrorHandler = (err, req, res, next) => {
  const errorCode = err.status || 500;

  if (process.env.NODE_ENV !== 'production') {
    res.locals.error = err;
    res.locals.message = err.title ? err.title : err.message;
  } else {
    res.locals.error = {};
    res.locals.message = 'Something terrible happened';
  }

  logger.error('Error handler', { error: res.locals });
  res.status(errorCode).send({ errors: [{ code: errorCode, message: res.locals.message }] });
};

export default apiErrorHandler;
