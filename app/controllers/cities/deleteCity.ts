import City from "../../models/city";
import { matchedData } from "express-validator";
import { Request, Response } from "express";
import deleteItem from "../../middleware/db/deleteItem";

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteCity = async (req: Request, res: Response) => {
  try {
    const matchedReq = matchedData(req);
    const id = await isIDGood(matchedReq.id);
    res.status(200).json(await deleteItem(id, City));
  } catch (error) {
    handleError(res, error);
  }
};

export default deleteCity;
