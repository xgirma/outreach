import logger from './logger';

/* eslint-disable-next-line */
const apiErrorHandler = (err, req, res, next) => {
  const errorCode = err.status || 500;

  if (process.env.NODE_ENV !== 'production') {
    res.locals.error = err;
  } else {
    res.locals.error = {};
    res.locals.message = 'Something terrible happened';
  }
  const { error } = res.locals;
  logger.error('Error handler', { ...error });
  res.status(errorCode).send({ status: 'fail', data: { ...error } });
};

export default apiErrorHandler;
