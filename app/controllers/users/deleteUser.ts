import { Request, Response } from "express";

import model from "../../models/user";
import { matchedData } from "express-validator";

import deleteItem from "../../middleware/db/deleteItem";

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteUser = async (req: Request, res: Response) => {
  try {
    const matchedReq = matchedData(req);
    const id = await isIDGood(matchedReq.id);
    res.status(200).json(await deleteItem(id, model));
  } catch (error) {
    handleError(res, error);
  }
};

export default deleteUser;
