import { Request } from "express";
import { CallbackError } from "mongoose";
import { IForgotPassword } from "../../../models/forgotPassword";
import { v4 } from "uuid";
import ForgotPassword from "../../../models/forgotPassword";
import buildErrObject from "../../../middleware/utils/buildErrObject";
import getCountry from "../../../middleware/utils/getCountry";
import getBrowserInfo from "../../../middleware/utils/getBrowserInfo";
import getIP from "../../../middleware/utils/getIP";

/**
 * Creates a new password forgot
 * @param {Object} req - request object
 */
const saveForgotPassword = (req: Request): Promise<IForgotPassword> => {
  return new Promise((resolve, reject) => {
    const forgot = new ForgotPassword({
      email: req.body.email,
      verification: v4(),
      ipRequest: getIP(req),
      browserRequest: getBrowserInfo(req),
      countryRequest: getCountry(req),
    });
    forgot.save((err: CallbackError, item: IForgotPassword) => {
      if (err) {
        return reject(buildErrObject(422, err.message));
      }
      resolve(item);
    });
  });
};

export default saveForgotPassword;
