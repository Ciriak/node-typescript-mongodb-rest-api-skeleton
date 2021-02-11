import { Model } from "mongoose";
import User, { IUser } from "../../models/user";

/**
 * Checks is password matches
 * @param {string} password - password
 * @param {Object} user - user object
 * @returns {boolean}
 */
const checkPassword = (password: string, user: IUser) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) {
        return reject(buildErrObject(422, err.message));
      }
      if (!isMatch) {
        resolve(false);
      }
      resolve(true);
    });
  });
};

module.exports = { checkPassword };
