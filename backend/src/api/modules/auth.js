import expressJwt from 'express-jwt';
import { Admins } from '../resources/admins/admins.model';
import logger from './logger';
import { Forbidden, Unauthorized } from './error';
import { isValidUsernamePassword } from '../../validators/un.pw';

const checkToken = expressJwt({ secret: process.env.JWT_SECRET });

export const verifyUser = (req, res, next) => {
  isValidUsernamePassword(req.body);
  const { username, password } = req.body;

  return Admins.findOne({ username })
    .then((user) => {
      if (!user) {
        logger.warn('Invalid signing attempt from ', req.ip);
        return setImmediate(() => next(Forbidden()));
      }
      if (!user.authenticate(password)) {
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
