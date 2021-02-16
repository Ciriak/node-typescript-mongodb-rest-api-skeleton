import listInitOptions from './listInitOptions';
import cleanPaginationID from './cleanPaginationID';
import { Request } from 'express';
import { FilterQuery, Model, PaginateModel, PaginateResult } from 'mongoose';
import buildErrObject from '../utils/buildErrObject';

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} query - query object
 */
const getItems = async (
  req: Request,
  model: Model<never>,
  query: FilterQuery<unknown>
): Promise<PaginateResult<unknown>> => {
  const options = await listInitOptions(req);

  return new Promise((resolve, reject) => {
    (model as PaginateModel<never>).paginate(
      query,
      options,
      (err: Error, items: PaginateResult<unknown>) => {
        if (err) {
          return reject(buildErrObject(422, err.message));
        }
        resolve(cleanPaginationID(items));
      }
    );
  });
};

export default getItems;
