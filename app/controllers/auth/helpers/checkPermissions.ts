import { NextFunction } from 'express';
import buildErrObject from '../../../middleware/utils/buildErrObject';
import itemNotFound from '../../../middleware/utils/itemNotFound';
import User, { IUser, UserRole } from '../../../models/user';

/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkPermissions = (
  { id, roles }: { id: string; roles: UserRole[] },
  next: NextFunction
) => {
  return new Promise((resolve, reject) => {
    User.findById(id, async (err: Error, result: IUser) => {
      try {
        await itemNotFound(err, result, 'USER_NOT_FOUND');
        if (result.role) {
          if (roles.indexOf(result.role) > -1) {
            return resolve(next());
          }
        }

        reject(buildErrObject(401, 'UNAUTHORIZED'));
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default checkPermissions;
