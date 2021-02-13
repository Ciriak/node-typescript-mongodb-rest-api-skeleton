import itemNotFound from '../../../middleware/utils/itemNotFound';
import { IUser } from '../../../models/user';

/**
 * Updates a user password in database
 * @param {string} password - new password
 * @param {Object} user - user object
 */
const updatePassword = (password: string, user: IUser) => {
  return new Promise((resolve, reject) => {
    user.password = password;
    user.save(async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND');
        resolve(item);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default updatePassword;
