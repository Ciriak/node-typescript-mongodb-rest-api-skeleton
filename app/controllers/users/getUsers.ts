import { Request, Response } from "express";
import checkQueryString from "../../middleware/db/checkQueryString";
import getItems from "../../middleware/db/getItems";
import handleError from "../../middleware/utils/handleError";

import User from "../../models/user";

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req: Request, res: Response) => {
  try {
    const query = await checkQueryString(req.query);
    res.status(200).json(await getItems(req, User, query));
  } catch (error) {
    handleError(res, error);
  }
};

export default getUsers;
