import logger from './logger';

export const apiErrorHandler = (err, req, res, next) => {
  console.log(err);
  const errorCode = err.status || 500;

  if (process.env.NODE_ENV !== 'production') {
    res.locals.error = err;
    res.locals.message = err.title ? err.title : err.message;
  } else {
    res.locals.error = {};
    res.locals.message = 'Something terrible happened';
  }

  logger.error(`${res.locals.message}`, { err });
  res.status(errorCode).send({ errors: [{ code: errorCode, message: res.locals.message }] });
};
