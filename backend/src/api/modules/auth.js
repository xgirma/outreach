import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { Admins } from '../resources/admins/admins.model';
import logger from './logger';
import { Forbidden, Unauthorized } from './error';
import { usernamePasswordObject, isValidMongoID, isValidRole } from './schema';

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
      logger.debug('Good signin ', username);
      return next();
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });
};

/**
 * Given mongoID and role returns JWT token
 * @param id: mongodb ID
 * @param role: 0 or 1, 0 for supper-admin, 1 for admin
 * @returns {string}
 * This function may fail for several reasons
 *  - no or bad mongoID
 *  - role other than 1 or 0
 *  - no secret
 */
export const signToken = (id, role) => {
  try {
    isValidMongoID(id);
    isValidRole(role);
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
  } catch (error) {
    throw error;
  }
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
