import expressJwt from 'express-jwt';
import { Admins } from '../resources/admins/admins.model';
import logger from './logger';
import { Forbidden, Unauthorized } from './error';
import { usernamePasswordObject } from './schema';
import { signToken } from '../../lib/sign.token';

const checkToken = expressJwt({ secret: process.env.JWT_SECRET });

export const verifyUser = (req, res, next) => {
  usernamePasswordObject(req.body);
  const { username, password } = req.body;

  return Admins.findOne({ username })
    .then((user) => {
      if (!user) {
        logger.warn('Invalid signing attempt from ', req.ip);
        return setImmediate(() => next(Forbidden()));
      } else if (!user.authenticate(password)) {
        logger.warn('Invalid signing attempt from ', req.ip);
        return setImmediate(() => next(Forbidden()));
      }
      req.user = user;
      logger.debug(`${username} is a registered user`);
      return next();
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });
};

/* eslint-disable-next-line */
export const signin = (req, res, next) => {
  const { id, role } = req.user;
  try {
    const token = signToken(id, role);
    res.status(200).json({ status: 'success', data: { id, role, token } });
  } catch (error) {
    setImmediate(() => next(error));
  }
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
        return setImmediate(() => next(Unauthorized()));
      }
      req.user = user;
      return setImmediate(() => next());
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });

export const protect = [decodeToken(), getFreshUser()];
