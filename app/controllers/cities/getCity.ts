import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import getItem from '../../middleware/db/getItem';
import handleError from '../../middleware/utils/handleError';
import isIDGood from '../../middleware/utils/isIDGood';
import City from '../../models/city';

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const getCity = async (req: Request, res: Response) => {
  try {
    const matchedReq = matchedData(req);
    const id = await isIDGood(matchedReq.id);
    res.status(200).json(await getItem(id, City));
  } catch (error) {
    handleError(res, error);
  }
};

export default getCity;
