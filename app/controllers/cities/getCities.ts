import City from "../../models/city";

import { Request, Response } from "express";
import checkQueryString from "../../middleware/db/checkQueryString";
import getItems from "../../middleware/db/getItems";

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCities = async (req: Request, res: Response) => {
  try {
    const query = await checkQueryString(req.query);
    res.status(200).json(await getItems(req, City, query));
  } catch (error) {
    handleError(res, error);
  }
};

export default getCities;
