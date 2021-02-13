import buildErrObject from '../../../middleware/utils/buildErrObject';
import { IUser } from '../../../models/user';
import blockIsExpired from './blockIsExpired';

/**
 *
 * @param {Object} user - user object.
 */
const checkLoginAttemptsAndBlockExpires = (user: IUser) => {
  return new Promise((resolve, reject) => {
    // Let user try to login again after blockexpires, resets user loginAttempts
    if (
      blockIsExpired({
        blockExpires: user.blockExpires,
        loginAttempts: user.loginAttempts || 0
      })
    ) {
      user.loginAttempts = 0;
      user.save((err, result) => {
        if (err) {
          return reject(buildErrObject(422, err.message));
        }
        if (result) {
          return resolve(true);
        }
      });
    }
    // User is not blocked, check password (normal behaviour)
    resolve(true);
  });
};

export default checkLoginAttemptsAndBlockExpires;
