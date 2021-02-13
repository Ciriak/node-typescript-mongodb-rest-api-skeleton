import { CallbackError } from 'mongoose';
import itemNotFound from '../../../middleware/utils/itemNotFound';
import User, { IUser } from '../../../models/user';

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = (id: string) => {
  return new Promise((resolve, reject) => {
    User.findById(
      id,
      '-_id -updatedAt -createdAt',
      null,
      async (err: CallbackError, user: IUser | null) => {
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

export default getProfileFromDB;
