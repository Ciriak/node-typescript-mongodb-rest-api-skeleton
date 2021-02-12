import User, { IUser } from "../../../models/user";
import { CallbackError } from "mongoose";
import itemNotFound from "../../../middleware/utils/itemNotFound";

/**
 * Finds user by id
 * @param {string} id - user id
 */
const findUser = (id: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    User.findById(
      id,
      "password email",
      null,
      async (err: CallbackError, user: IUser | null) => {
        try {
          await itemNotFound(err, user, "USER_DOES_NOT_EXIST");
          if (user) {
            resolve(user);
          }
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default findUser;
