import { IUser } from "../../../models/user";

import { addHours } from "date-fns";
import buildErrObject from "../../../middleware/utils/buildErrObject";
import IErrorObject from "../../../../interfaces/ErrorObject.interface";
const HOURS_TO_BLOCK = 2;

/**
 * Blocks a user by setting blockExpires to the specified date based on constant HOURS_TO_BLOCK
 * @param {Object} user - user object
 */
const blockUser = (user: IUser): Promise<IErrorObject> => {
  return new Promise((resolve, reject) => {
    user.blockExpires = addHours(new Date(), HOURS_TO_BLOCK);
    user.save((err, result) => {
      if (err) {
        return reject(buildErrObject(422, err.message));
      }
      if (result) {
        return resolve(buildErrObject(409, "BLOCKED_USER"));
      }
    });
  });
};

export default blockUser;
