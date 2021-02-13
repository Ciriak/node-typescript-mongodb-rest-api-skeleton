import { Model } from 'mongoose';
import itemNotFound from '../utils/itemNotFound';

/**
 * Gets item from database by id
 * @param {string} id - item id
 */
const getItem = (id: string, model: Model<any>) => {
  return new Promise((resolve, reject) => {
    model.findById(id, async (err: Error, item: object) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND');
        resolve(item);
      } catch (error) {
        reject(error);
      }
    });
  });
};
export default getItem;
