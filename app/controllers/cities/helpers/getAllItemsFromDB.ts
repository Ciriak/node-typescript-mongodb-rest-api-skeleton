import buildErrObject from '../../../middleware/utils/buildErrObject';
import City, { ICity } from '../../../models/city';

/**
 * Gets all items from database
 */
const getAllItemsFromDB = (): Promise<ICity[]> => {
  return new Promise((resolve, reject) => {
    City.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          name: 1
        }
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(422, err.message));
        }
        resolve(items);
      }
    );
  });
};

export default getAllItemsFromDB;
