import { CallbackError } from "mongoose";
import itemNotFound from "../../../middleware/utils/itemNotFound";
import User, { IUser } from "../../../models/user";

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = (email: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email,
      },
      "password loginAttempts blockExpires name email role verified verification",
      null,
      async (err: CallbackError, item: IUser | null) => {
        try {
          await itemNotFound(err, item, "USER_DOES_NOT_EXIST");
          if (item) {
            resolve(item);
          }
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default findUser;
