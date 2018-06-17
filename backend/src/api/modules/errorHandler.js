import logger from './logger';

/* eslint-disable-next-line */
const apiErrorHandler = (err, req, res, next) => {
  const errorCode = err.status || 500;
  logger.error('Error Handler', { error: err.name, message: err.message });

  if (process.env.NODE_ENV !== 'production') {
    res.locals.name = err.name;
    res.locals.message = err.message;
  } else {
    res.locals.error = {};
    res.locals.message = 'Something terrible happened';
  }
  const { locals } = res;
  const { name, message } = locals;
  res.status(errorCode).send({ status: 'fail', data: { name, message } });
};

export default apiErrorHandler;
