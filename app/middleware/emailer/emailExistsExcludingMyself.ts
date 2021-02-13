import User, { IUser } from '../../models/user';
import buildErrObject from '../utils/buildErrObject';

/**
 * Checks User model if user with an specific email exists but excluding user id
 * @param {string} id - user id
 * @param {string} email - user email
 */
const emailExistsExcludingMyself = (
  id: string,
  email: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email,
        _id: {
          $ne: id
        }
      },
      async (err: Error, item: IUser) => {
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

export default emailExistsExcludingMyself;
