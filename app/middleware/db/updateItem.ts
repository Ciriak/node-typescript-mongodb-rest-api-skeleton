import { Request } from 'express';
import { Model } from 'mongoose';
import itemNotFound from '../utils/itemNotFound';
/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} req - request object
 */
const updateItem = (
  id = '',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: Model<any>,
  req: Request
): Promise<Document> => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        runValidators: true
      },
      async (err, doc) => {
        try {
          await itemNotFound(err, doc, 'NOT_FOUND');
          resolve(doc);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default updateItem;
