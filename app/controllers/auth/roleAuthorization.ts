import { NextFunction, Request, Response } from "express";
import handleError from "../../middleware/utils/handleError";
import { UserRole } from "../../models/user";
import checkPermissions from "./helpers/checkPermissions";

/**
 * Roles authorization function called by route
 * @param {Array} roles - roles specified on the route
 */
const roleAuthorization = (roles: UserRole[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {
      id: (req as any).user._id,
      roles,
    };
    await checkPermissions(data, next);
  } catch (error) {
    handleError(res, error);
  }
};

export default roleAuthorization;
