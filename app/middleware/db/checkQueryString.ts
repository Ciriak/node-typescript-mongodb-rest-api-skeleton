/* eslint-disable @typescript-eslint/ban-types */
import buildErrObject from '../utils/buildErrObject';

/**
 * Checks the query string for filtering records
 * query.filter should be the text to search (string)
 * query.fields should be the fields to search into (array)
 * @param {Object} query - query object
 */

const checkQueryString = (query: any): Promise<object> => {
  return new Promise((resolve, reject) => {
    try {
      if (
        typeof query.filter !== 'undefined' &&
        typeof query.fields !== 'undefined'
      ) {
        const data: { $or: any[] } = {
          $or: []
        };
        const array: any[] = [];
        // Takes fields param and builds an array by splitting with ','
        const arrayFields = query.fields.split(',');
        // Adds SQL Like %word% with regex
        // eslint-disable-next-line
        arrayFields.map((item: any) => {
          array.push({
            [item]: {
              $regex: new RegExp(query.filter, 'i')
            }
          });
        });
        // Puts array result in data
        data.$or = array;
        resolve(data);
      } else {
        resolve({});
      }
    } catch (err) {
      console.log(err.message);
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'));
    }
  });
};

export default checkQueryString;
