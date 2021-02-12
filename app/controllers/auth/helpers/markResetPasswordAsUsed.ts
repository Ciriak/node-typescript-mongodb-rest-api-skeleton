import { Request } from "express";
import buildSuccObject from "../../../middleware/utils/buildSuccObject";
import getBrowserInfo from "../../../middleware/utils/getBrowserInfo";
import getCountry from "../../../middleware/utils/getCountry";
import getIP from "../../../middleware/utils/getIP";
import itemNotFound from "../../../middleware/utils/itemNotFound";
import { IForgotPassword } from "../../../models/forgotPassword";

/**
 * Marks a request to reset password as used
 * @param {Object} req - request object
 * @param {Object} forgot - forgot object
 */
const markResetPasswordAsUsed = (req: Request, forgot: IForgotPassword) => {
  return new Promise((resolve, reject) => {
    forgot.used = true;
    forgot.ipChanged = getIP(req);
    forgot.browserChanged = getBrowserInfo(req);
    forgot.countryChanged = getCountry(req);
    forgot.save(async (err, item) => {
      try {
        await itemNotFound(err, item, "NOT_FOUND");
        resolve(buildSuccObject("PASSWORD_CHANGED"));
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default markResetPasswordAsUsed;
