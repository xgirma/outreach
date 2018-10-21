import { Forbidden } from '../api/modules/error';
import { Admins } from '../api/resources/admins/admins.model';
import logger from '../api/modules/logger';
import { isValidUsernamePassword } from '../validators/un.pw';

export const verifyUser = async (req, res, next) => {
  let user;
  try {
    isValidUsernamePassword(req.body);
    const { username, password } = req.body;

    user = await Admins.findOne({ username });
    if (!user) {
      logger.warn('Failed user verification: ', req.ip);
      return next(Forbidden());
    }
    if (!user.authenticate(password)) {
      logger.warn('Failed user verification: ', req.ip);
      return next(Forbidden());
    }
    req.user = user;
    logger.debug(`${username} is a registered user`);
    return next();
  } catch (error) {
    return next(error);
  }
};
