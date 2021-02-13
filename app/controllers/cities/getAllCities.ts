import { Request, Response } from 'express';
import handleError from '../../middleware/utils/handleError';
import getAllItemsFromDB from './helpers/getAllItemsFromDB';

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllCities = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await getAllItemsFromDB());
  } catch (error) {
    handleError(res, error);
  }
};

export default getAllCities;
