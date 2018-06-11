import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { Admin } from '../resources/admin/admin.model';
import logger from './logger';
import { AUTERR } from '../docs/error.codes';

const secret = process.env.JWT_SECRET;
const checkToken = expressJwt({ secret });

export const verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    logger.info('signin: you need a username and password', { un: username });
    return setImmediate(() => next(AUTERR));
  }

  return Admin.findOne({ username })
    .then((user) => {
      if (!user) {
        logger.info('signin: no user with the given username', { un: username });
        return setImmediate(() => next(AUTERR));
      } else if (!user.authenticate(password)) {
        logger.info('signin: wrong password', { un: username });
        return setImmediate(() => next(AUTERR));
      }
      req.user = user;
      logger.info('signin: user found', { un: username });
      return next();
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });
};

/* eslint-disable-next-line */
export const signToken = (id) => {
  if (id) {
    return jwt.sign({ id }, secret, { expiresIn: process.env.EXPIRATION_TIME });
  }
};

/* eslint-disable-next-line */
export const signin = (req, res, next) => {
  const token = signToken(req.user.id);
  res.status(200).json({ token, id: req.user.id });
};

export const decodeToken = () => (req, res, next) => {
  /* eslint-disable-next-line */
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = `Bearer ${req.query.access_token}`;
  }
  checkToken(req, res, next);
};

export const getFreshUser = () => (req, res, next) =>
  Admin.findById(req.user.id)
    .then((user) => {
      if (!user) {
        logger.info('signin: unauthorized', { user });
        return setImmediate(() => next(AUTERR));
      }
      req.user = user;
      return setImmediate(() => next());
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });

export const protect = [decodeToken(), getFreshUser()];
