import { matchedData } from "express-validator";
import { Request, Response } from "express";
import updateProfileInDB from "./helpers/updateProfileInDB";
import isIDGood from "../../middleware/utils/isIDGood";

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = await isIDGood((req as any).user._id);
    const matchedReq = matchedData(req);
    res.status(200).json(await updateProfileInDB(matchedReq, id));
  } catch (error) {
    handleError(res, error);
  }
};

export default updateProfile;
