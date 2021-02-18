import { Model } from 'mongoose';
import ISuccessObject from '../../../interfaces/SuccessObject.interface';
import buildSuccObject from '../utils/buildSuccObject';
import itemNotFound from '../utils/itemNotFound';

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 */
// eslint-disable-next-line
const deleteItem = (id: string, model: Model<any>): Promise<ISuccessObject> => {
  return new Promise((resolve, reject) => {
    model.findByIdAndRemove(id, null, async (err, doc) => {
      try {
        await itemNotFound(err, doc, 'NOT_FOUND');
        resolve(buildSuccObject('DELETED'));
      } catch (error) {
        reject(error);
      }
    });
  });
};
export default deleteItem;
