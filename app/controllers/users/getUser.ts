import { Request, Response } from 'express';

import User from '../../models/user';
import { matchedData } from 'express-validator';
import isIDGood from '../../middleware/utils/isIDGood';
import getItem from '../../middleware/db/getItem';
import handleError from '../../middleware/utils/handleError';

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUser = async (req: Request, res: Response) => {
  try {
    const matchedReq = matchedData(req);
    const id = await isIDGood(matchedReq.id);
    res.status(200).json(await getItem(id, User));
  } catch (error) {
    handleError(res, error);
  }
};

export default getUser;
