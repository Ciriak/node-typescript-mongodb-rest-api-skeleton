import buildErrObject from '../../../middleware/utils/buildErrObject';
import City from '../../../models/city';

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const cityExists = (name: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    City.findOne(
      {
        name
      },
      null,
      null,
      (err, doc) => {
        if (err) {
          return reject(buildErrObject(422, err.message));
        }

        if (doc) {
          return reject(buildErrObject(422, 'CITY_ALREADY_EXISTS'));
        }
        resolve(false);
      }
    );
  });
};

export default cityExists;
