import { Document, Model } from 'mongoose';
import itemNotFound from '../utils/itemNotFound';

/**
 * Gets item from database by id
 * @param {string} id - item id
 */
// eslint-disable-next-line
const getItem = (id: string, model: Model<any>): Promise<Document<never>> => {
  return new Promise((resolve, reject) => {
    model.findById(id, null, null, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND');
        if (item) {
          resolve(item);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};
export default getItem;
