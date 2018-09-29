import { BadRequest } from '../api/modules/error';
import logger from '../api/modules/logger';

/**
 * Throws BadRequest is role is not 0 or 1
 * @param role
 * @throws 400
 * @return undefined
 */
export const isValidRole = (role = '-1') => {
  const set = [1, 0, '1', '0'];
  if (!set.includes(role)) {
    logger.error(
      `Invalid role provided "${role}" typeof ${typeof role}. Role must be either 0 or 1, with string or number type`,
    );
    throw BadRequest('role must be either 0 or 1');
  }
};
