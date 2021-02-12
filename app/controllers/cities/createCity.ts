import City from "../../models/city";

import { matchedData } from "express-validator";

import { Request, Response } from "express";
import cityExists from "./helpers/cityExists";
import createItem from "../../middleware/db/createItem";

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createCity = async (req: Request, res: Response) => {
  try {
    const matchedReq = matchedData(req);
    const doesCityExists = await cityExists(matchedReq.name);
    if (!doesCityExists) {
      res.status(201).json(await createItem(matchedReq, City));
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default createCity;
