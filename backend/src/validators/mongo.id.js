import { isMongoId } from 'validator';
import { BadRequest } from '../api/modules/error';
import logger from '../api/modules/logger';

/**
 * Throws BadRequest if ID is not mongoID format
 * @param id = mongoID
 * @throws 400
 * @return undefined
 */
export const isValidMongoID = (id = '') => {
  if (!isMongoId(id)) {
    logger.error('Invalid mongoID is provided. Use proper mongoID');
    throw BadRequest('proper mongoID required');
  }
};
