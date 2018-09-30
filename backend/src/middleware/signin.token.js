import { signToken } from '../lib/sign.token';
import { BadRequest } from '../api/modules/error';

/**
 * Sign JWT token containing user ID and role.
 * @param req
 * @param res
 * @param next
 * @throws 400
 * @return return status, id, role, and token
 * This function may fail for several reasons
 *  - no req.user
 *  - no or bad mongoID
 *  - no role, bad role type
 */
export const signinToken = (req, res, next) => {
  try {
    if (!req.user) {
      next(BadRequest('request with no user data'));
    } else {
      const { id, role } = req.user;
      const token = signToken(id, role);
      res.status(200).json({ status: 'success', data: { id, role, token } });
    }
  } catch (error) {
    next(error);
  }
};
