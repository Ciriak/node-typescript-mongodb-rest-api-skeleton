import { CallbackError } from 'mongoose';
import itemNotFound from '../../../middleware/utils/itemNotFound';

import User, { IUser } from '../../../models/user';

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
const findUserById = (userId: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    User.findById(userId, async (err: CallbackError, item: IUser) => {
      try {
        await itemNotFound(err, item, 'USER_DOES_NOT_EXIST');
        resolve(item);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default findUserById;
