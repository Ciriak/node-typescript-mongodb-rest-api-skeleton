import { v4 } from 'uuid';
import buildErrObject from '../../../middleware/utils/buildErrObject';
import User, { IUser } from '../../../models/user';

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItemInDb = (userProps: IUser): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const user = new User({ ...userProps, verification: v4() });
    user.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message));
      }

      const parsedItem = (item = JSON.parse(JSON.stringify(item)));

      delete parsedItem.password;
      delete parsedItem.blockExpires;
      delete parsedItem.loginAttempts;

      resolve(parsedItem);
    });
  });
};

export default createItemInDb;
