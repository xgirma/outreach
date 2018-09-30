import jwt from 'jsonwebtoken';
import { isValidMongoID } from '../validators/mongo.id';
import { isValidRole } from '../validators/role';

/**
 * Given mongoID and role returns JWT token
 * @param id: mongodb ID
 * @param role: [0, 1]
 * @throws 400
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
