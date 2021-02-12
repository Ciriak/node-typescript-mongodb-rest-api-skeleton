import { Request, Response } from "express";

import User from "../../models/user";
import { matchedData } from "express-validator";

import isIDGood from "../../middleware/utils/isIDGood";
import emailExistsExcludingMyself from "../../middleware/emailer/emailExistsExcludingMyself";
import updateItem from "../../middleware/db/updateItem";
import handleError from "../../middleware/utils/handleError";

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUser = async (req: Request, res: Response) => {
  try {
    const matchedReq = matchedData(req);
    const id = await isIDGood(matchedReq.id);
    const doesEmailExists = await emailExistsExcludingMyself(
      id,
      matchedReq.email
    );
    if (!doesEmailExists) {
      res.status(200).json(await updateItem(id, User, matchedReq as any));
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default updateUser;
