import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { Admins } from '../resources/admins/admins.model';
import logger from './logger';
import * as err from './error';
import * as test from './schema';

const secret = process.env.JWT_SECRET;
const checkToken = expressJwt({ secret });

export const verifyUser = (req, res, next) => {
  test.usernamePasswordObject(req.body);
  const { username, password } = req.body;

  return Admins.findOne({ username })
    .then((user) => {
      if (!user) {
        logger.warn('Invalid signing attempt from ', req.ip);
        return setImmediate(() => next(err.Forbidden()));
      } else if (!user.authenticate(password)) {
        logger.warn('Invalid signing attempt from ', req.ip);
        return setImmediate(() => next(err.Forbidden()));
      }
      req.user = user;
      logger.debug('Good signin ', username);
      return next();
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });
};

export const signToken = (id, role) =>
  jwt.sign({ id, role }, secret, { expiresIn: process.env.JWT_EXPIRATION_TIME });

/* eslint-disable-next-line */
export const signin = (req, res, next) => {
  const { id, role } = req.user;
  const token = signToken(id, role);
  res.status(200).json({ status: 'success', data: { id, role, token } });
};

export const decodeToken = () => (req, res, next) => {
  /* eslint-disable-next-line */
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = `Bearer ${req.query.access_token}`;
  }
  checkToken(req, res, next);
};

export const getFreshUser = () => (req, res, next) =>
  Admins.findById(req.user.id)
    .then((user) => {
      if (!user) {
        logger.warn('Bad username ', req.ip);
        return setImmediate(() => next(err.Unauthorized()));
      }
      req.user = user;
      return setImmediate(() => next());
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });

export const protect = [decodeToken(), getFreshUser()];
