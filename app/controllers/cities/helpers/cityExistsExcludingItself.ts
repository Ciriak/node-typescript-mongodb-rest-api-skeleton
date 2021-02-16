import buildErrObject from '../../../middleware/utils/buildErrObject';
import City from '../../../models/city';

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */
const cityExistsExcludingItself = (
  id: string,
  name: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    City.findOne(
      {
        name,
        _id: {
          $ne: id
        }
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

export default cityExistsExcludingItself;
