import User, { IUser } from '../../models/user';
import buildErrObject from '../utils/buildErrObject';

/**
 * Checks User model if user with an specific email exists
 * @param {string} email - user email
 */
const emailExists = (email: string) => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email
      },
      (err: Error, item: IUser) => {
        if (err) {
          return reject(buildErrObject(422, err.message));
        }

        if (item) {
          return reject(buildErrObject(422, 'EMAIL_ALREADY_EXISTS'));
        }
        resolve(false);
      }
    );
  });
};
export default emailExists;
