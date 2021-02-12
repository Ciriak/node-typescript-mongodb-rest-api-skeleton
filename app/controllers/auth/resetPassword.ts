import { Request, Response } from "express";

import { matchedData } from "express-validator";
import handleError from "../../middleware/utils/handleError";
import findForgotPassword from "./helpers/findForgotPassword";
import findUserToResetPassword from "./helpers/findUserToResetPassword";
import markResetPasswordAsUsed from "./helpers/markResetPasswordAsUsed";
import updatePassword from "./helpers/updatePassword";

/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const resetPassword = async (req: Request, res: Response) => {
  try {
    const data = matchedData(req);
    const forgotPassword = await findForgotPassword(data.id);
    const user = await findUserToResetPassword(forgotPassword.email);
    await updatePassword(data.password, user);
    const result = await markResetPasswordAsUsed(req, forgotPassword);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export default resetPassword;
