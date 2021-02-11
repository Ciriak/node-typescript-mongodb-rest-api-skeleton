import { Model } from "mongoose";
import buildSuccObject from "../utils/buildSuccObject";
import itemNotFound from "../utils/itemNotFound";

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 */
const deleteItem = (id: string, model: Model<any>) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndRemove(id, null, async (err: Error, item: object) => {
      try {
        await itemNotFound(err, item, "NOT_FOUND");
        resolve(buildSuccObject("DELETED"));
      } catch (error) {
        reject(error);
      }
    });
  });
};
export default deleteItem;
