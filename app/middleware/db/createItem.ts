import { Request } from "express";
import { Model } from "mongoose";
import buildErrObject from "../utils/buildErrObject";

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItem = (req: Request, model: Model<any>) => {
  return new Promise((resolve, reject) => {
    model.create(req, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message));
      }
      resolve(item);
    });
  });
};

export default createItem;
