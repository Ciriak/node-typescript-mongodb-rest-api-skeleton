import { Request, Response } from 'express';

import { matchedData } from 'express-validator';
import sendResetPasswordEmailMessage from '../../middleware/emailer/sendResetPasswordEmailMessage';
import handleError from '../../middleware/utils/handleError';
import findUser from './helpers/findUser';
import forgotPasswordResponse from './helpers/forgotPasswordResponse';
import saveForgotPassword from './helpers/saveForgotPassword';

/**
 * Forgot password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const forgotPassword = async (req: Request, res: Response) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale();
    const data = matchedData(req);
    await findUser(data.email);
    const item = await saveForgotPassword(req);
    sendResetPasswordEmailMessage(locale, item);
    res.status(200).json(
      forgotPasswordResponse({
        email: item.email,
        verification: item.verification || ''
      })
    );
  } catch (error) {
    handleError(res, error);
  }
};

export default forgotPassword;
