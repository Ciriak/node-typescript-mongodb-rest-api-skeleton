import { CallbackError } from "mongoose";
import itemNotFound from "../../../middleware/utils/itemNotFound";
import ForgotPassword, {
  IForgotPassword,
} from "../../../models/forgotPassword";

/**
 * Checks if a forgot password verification exists
 * @param {string} id - verification id
 */
const findForgotPassword = (id: string): Promise<IForgotPassword> => {
  return new Promise((resolve, reject) => {
    ForgotPassword.findOne(
      {
        verification: id,
        used: false,
      },
      async (err: CallbackError, item: IForgotPassword | null) => {
        try {
          await itemNotFound(err, item, "NOT_FOUND_OR_ALREADY_USED");
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

export default findForgotPassword;
