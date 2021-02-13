import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import checkPassword from '../../middleware/auth/checkPassword';
import handleError from '../../middleware/utils/handleError';
import checkLoginAttemptsAndBlockExpires from './helpers/checkLoginAttemptsAndBlockExpires';
import findUser from './helpers/findUser';
import passwordsDoNotMatch from './helpers/passwordsDoNotMatch';
import saveLoginAttemptsToDB from './helpers/saveLoginAttemptsToDB';
import saveUserAccessAndReturnToken from './helpers/saveUserAccessAndReturnToken';
import userIsBlocked from './helpers/userIsBlocked';

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req: Request, res: Response) => {
  try {
    const data = matchedData(req);
    const user = await findUser(data.email);
    await userIsBlocked(user);
    await checkLoginAttemptsAndBlockExpires(user);
    const isPasswordMatch = await checkPassword(data.password, user);
    if (!isPasswordMatch) {
      handleError(res, await passwordsDoNotMatch(user));
    } else {
      // all ok, register access and return token
      user.loginAttempts = 0;
      await saveLoginAttemptsToDB(user);
      res.status(200).json(await saveUserAccessAndReturnToken(req, user));
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default login;
