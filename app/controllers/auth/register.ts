import { Request, Response } from "express";
import { matchedData } from "express-validator";
import emailExists from "../../middleware/emailer/emailExists";
import sendRegistrationEmailMessage from "../../middleware/emailer/sendRegistrationEmailMessage";
import handleError from "../../middleware/utils/handleError";
import { IUser } from "../../models/user";
import registerUser from "./helpers/registerUser";
import returnRegisterToken from "./helpers/returnRegisterToken";
import setUserInfo from "./helpers/setUserInfo";

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req: Request, res: Response) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale();
    const matchedReq = matchedData(req) as IUser;

    const doesEmailExists = await emailExists(matchedReq.email);
    if (!doesEmailExists) {
      const item = await registerUser(matchedReq);
      const userInfo = await setUserInfo(item);
      const response = await returnRegisterToken(
        {
          _id: matchedReq._id,
          verification: matchedReq.verification || "",
        },
        userInfo
      );
      sendRegistrationEmailMessage(locale, item);
      res.status(201).json(response);
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default register;
