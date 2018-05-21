import logger from './logger';

export const apiErrorHandler = (err, req, res, next) => {
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
};
