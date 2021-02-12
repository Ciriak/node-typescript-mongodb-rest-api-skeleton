import { CallbackError } from "mongoose";
import buildErrObject from "./buildErrObject";

/**
 * Item not found
 * @param {Object} err - error object
 * @param {Object} item - item result object
 * @param {string} message - message
 */
const itemNotFound = (
  err: CallbackError,
  item: object | null,
  message = "NOT_FOUND"
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (err) {
      return reject(buildErrObject(422, err.message));
    }
    if (!item) {
      return reject(buildErrObject(404, message));
    }
    resolve();
  });
};

export default itemNotFound;
