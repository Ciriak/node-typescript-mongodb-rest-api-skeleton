import City from "../../models/city";
import { matchedData } from "express-validator";
import cityExistsExcludingItself from "./helpers/cityExistsExcludingItself";
import { Request, Response } from "express";
import updateItem from "../../middleware/db/updateItem";

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateCity = async (req: Request, res: Response) => {
  try {
    const matchedReq = matchedData(req);
    const id = await isIDGood(matchedReq.id);
    const doesCityExists = await cityExistsExcludingItself(id, matchedReq.name);
    if (!doesCityExists) {
      res.status(200).json(await updateItem(id, City, req));
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default updateCity;
