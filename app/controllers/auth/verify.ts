import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import handleError from '../../middleware/utils/handleError';
import verificationExists from './helpers/verificationExists';
import verifyUser from './helpers/verifyUser';

/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verify = async (req: Request, res: Response) => {
  try {
    const matchedReq = matchedData(req);
    const user = await verificationExists(matchedReq.id);
    res.status(200).json(await verifyUser(user));
  } catch (error) {
    handleError(res, error);
  }
};

export default verify;
