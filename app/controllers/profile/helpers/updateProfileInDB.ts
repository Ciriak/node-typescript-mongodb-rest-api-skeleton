import User, { IUser } from "../../../models/user";
import { CallbackError } from "mongoose";
import itemNotFound from "../../../middleware/utils/itemNotFound";

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = (req: Record<string, any>, id: string) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        runValidators: true,
        select: "-role -_id -updatedAt -createdAt",
      } as any, //FIXME
      async (err: CallbackError, user: IUser) => {
        try {
          await itemNotFound(err, user, "NOT_FOUND");
          resolve(user);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default updateProfileInDB;
