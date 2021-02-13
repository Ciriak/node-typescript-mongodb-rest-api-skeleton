import { CallbackError } from 'mongoose';
import itemNotFound from '../../../middleware/utils/itemNotFound';
import User, { IUser } from '../../../models/user';

/**
 * Finds user by email to reset password
 * @param {string} email - user email
 */
const findUserToResetPassword = (email: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email
      },
      async (err: CallbackError, user: IUser) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND');
          resolve(user);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default findUserToResetPassword;
