import { CallbackError, Document, Model } from "mongoose";
import buildErrObject from "../utils/buildErrObject";

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItem = (req: Record<string, any>, model: Model<any>) => {
  return new Promise((resolve, reject) => {
    model.create(req, (err: CallbackError, item: Document) => {
      if (err) {
        reject(buildErrObject(422, err.message));
      }
      resolve(item);
    });
  });
};

export default createItem;
