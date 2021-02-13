import { CallbackError } from 'mongoose';
import buildErrObject from '../../../middleware/utils/buildErrObject';
import { IUser } from '../../../models/user';

/**
 * Saves login attempts to dabatabse
 * @param {Object} user - user object
 */
const saveLoginAttemptsToDB = (user: IUser) => {
  return new Promise((resolve, reject) => {
    user.save((err: CallbackError, result: IUser) => {
      if (err) {
        return reject(buildErrObject(422, err.message));
      }
      if (result) {
        resolve(true);
      }
    });
  });
};

export default saveLoginAttemptsToDB;
