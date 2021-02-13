import buildErrObject from '../../../middleware/utils/buildErrObject';
import { IUser } from '../../../models/user';

/**
 * Verifies an user
 * @param {Object} user - user object
 */
const verifyUser = (user: IUser) => {
  return new Promise((resolve, reject) => {
    user.verified = true;
    user.save((err, item) => {
      if (err) {
        return reject(buildErrObject(422, err.message));
      }
      resolve({
        email: item.email,
        verified: item.verified
      });
    });
  });
};

export default verifyUser;
