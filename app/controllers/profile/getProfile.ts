import { Request, Response } from 'express';
import handleError from '../../middleware/utils/handleError';
import isIDGood from '../../middleware/utils/isIDGood';
import getProfileFromDB from './helpers/getProfileFromDB';

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProfile = async (req: Request, res: Response) => {
  try {
    const id = await isIDGood((req as any).user._id);
    res.status(200).json(await getProfileFromDB(id));
  } catch (error) {
    handleError(res, error);
  }
};

export default getProfile;
