import { matchedData } from 'express-validator';
import { Request, Response } from 'express';
import changePasswordInDB from './helpers/changePasswordInDB';
import buildErrObject from '../../middleware/utils/buildErrObject';
import findUser from './helpers/findUser';
import isIDGood from '../../middleware/utils/isIDGood';
import handleError from '../../middleware/utils/handleError';
import checkPassword from '../../middleware/auth/checkPassword';

/**
 * Change password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const changePassword = async (req: Request, res: Response) => {
  try {
    const id = await isIDGood((req as any).user._id);
    const user = await findUser(id);
    const matchedReq = matchedData(req);
    const isPasswordMatch = await checkPassword(matchedReq.oldPassword, user);
    if (!isPasswordMatch) {
      return handleError(res, buildErrObject(409, 'WRONG_PASSWORD'));
    } else {
      // all ok, proceed to change password
      res.status(200).json(await changePasswordInDB(id, matchedReq));
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default changePassword;
