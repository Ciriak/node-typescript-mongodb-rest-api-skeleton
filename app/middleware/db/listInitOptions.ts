import buildSort from './buildSort';
import { Request } from 'express';
import buildErrObject from '../utils/buildErrObject';
/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = (req: Request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = req.query.order || -1;
      const sort = req.query.sort || 'createdAt';
      const sortBy = buildSort(String(sort), parseInt(String(order), 10));
      const page = parseInt(String(req.query.page), 10) || 1;
      const limit = parseInt(String(req.query.limit), 10) || 5;
      const options = {
        sort: sortBy,
        lean: true,
        page,
        limit
      };
      resolve(options);
    } catch (error) {
      console.log(error.message);
      reject(buildErrObject(422, 'ERROR_WITH_INIT_OPTIONS'));
    }
  });
};

export default listInitOptions;
