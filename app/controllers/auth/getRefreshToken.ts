import { Request, Response } from "express";
import handleError from "../../middleware/utils/handleError";
import isIDGood from "../../middleware/utils/isIDGood";
import findUserById from "./helpers/findUserById";
import getUserIdFromToken from "./helpers/getUserIdFromToken";
import saveUserAccessAndReturnToken from "./helpers/saveUserAccessAndReturnToken";

/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRefreshToken = async (req: Request, res: Response) => {
  try {
    const tokenEncrypted =
      req.headers.authorization || "".replace("Bearer ", "").trim();
    let userId = await getUserIdFromToken(tokenEncrypted);
    userId = await isIDGood(userId);
    const user = await findUserById(userId);
    const token = await saveUserAccessAndReturnToken(req, user);
    // Removes user info from response
    delete token.user;
    res.status(200).json(token);
  } catch (error) {
    handleError(res, error);
  }
};

export default getRefreshToken;
