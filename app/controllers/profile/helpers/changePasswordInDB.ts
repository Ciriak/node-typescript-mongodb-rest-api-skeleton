import buildErrObject from '../../../middleware/utils/buildErrObject';
import buildSuccObject from '../../../middleware/utils/buildSuccObject';
import itemNotFound from '../../../middleware/utils/itemNotFound';
import User from '../../../models/user';

/**
 * Changes password in database
 * @param {string} id - user id
 * @param {Object} req - request object
 */
const changePasswordInDB = (id: string, req: Record<string, any>) => {
  return new Promise((resolve, reject) => {
    User.findById(id, '+password', null, async (err, user) => {
      try {
        await itemNotFound(err, user, 'NOT_FOUND');

        if (!user) {
          return reject(buildErrObject(422, 'NOT_FOUND'));
        }

        // Assigns new password to user
        user.password = (req as any).newPassword;

        // Saves in DB
        user.save((error) => {
          if (error) {
            return reject(buildErrObject(422, error.message));
          }
          resolve(buildSuccObject('PASSWORD_CHANGED'));
        });
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default changePasswordInDB;
