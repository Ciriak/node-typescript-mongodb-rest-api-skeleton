import { Request } from 'express';
import { IUser } from '../../../models/user';
import UserAccess from '../../../models/userAccess';
import setUserInfo from './setUserInfo';
import generateToken from './generateToken';
import getBrowserInfo from '../../../middleware/utils/getBrowserInfo';
import getCountry from '../../../middleware/utils/getCountry';
import buildErrObject from '../../../middleware/utils/buildErrObject';
import getIP from '../../../middleware/utils/getIP';

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 */
const saveUserAccessAndReturnToken = (
  req: Request,
  user: IUser
): Promise<{
  token: string;
  user?: IUser;
}> => {
  return new Promise((resolve, reject) => {
    const userAccess = new UserAccess({
      email: user.email,
      ip: getIP(req),
      browser: getBrowserInfo(req),
      country: getCountry(req)
    });
    userAccess.save(async (err) => {
      try {
        if (err) {
          return reject(buildErrObject(422, err.message));
        }
        const userInfo = await setUserInfo(user);
        // Returns data with access token
        resolve({
          token: generateToken(user._id),
          user: userInfo
        });
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default saveUserAccessAndReturnToken;
