import buildErrObject from '../../../middleware/utils/buildErrObject';
import { IUser } from '../../../models/user';

/**
 * Checks if blockExpires from user is greater than now
 * @param {Object} user - user object
 */
const userIsBlocked = (user: IUser) => {
  return new Promise((resolve, reject) => {
    if (user.blockExpires > new Date()) {
      return reject(buildErrObject(409, 'BLOCKED_USER'));
    }
    resolve(true);
  });
};
export default userIsBlocked;
