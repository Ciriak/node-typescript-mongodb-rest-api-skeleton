import { Request, Response } from "express";
import { matchedData } from "express-validator";
import emailExists from "../../middleware/emailer/emailExists";
import sendRegistrationEmailMessage from "../../middleware/emailer/sendRegistrationEmailMessage";
import handleError from "../../middleware/utils/handleError";
import createItemInDb from "./helpers/createItemInDb";

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createUser = async (req: Request, res: Response) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale();
    const matchedReq = matchedData(req);
    const doesEmailExists = await emailExists(matchedReq.email);
    if (!doesEmailExists) {
      const item = await createItemInDb(matchedReq as any);
      sendRegistrationEmailMessage(locale, item);
      res.status(201).json(item);
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default createUser;
