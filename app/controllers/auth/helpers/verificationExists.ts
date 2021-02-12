import itemNotFound from "../../../middleware/utils/itemNotFound";
import User, { IUser } from "../../../models/user";

/**
 * Checks if verification id exists for user
 * @param {string} id - verification id
 */
const verificationExists = (id: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        verification: id,
        verified: false,
      },
      async (err: Error, user: IUser) => {
        try {
          await itemNotFound(err, user, "NOT_FOUND_OR_ALREADY_VERIFIED");
          resolve(user);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default verificationExists;
