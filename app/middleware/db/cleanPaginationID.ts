/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginateResult } from 'mongoose';

/**
 * Hack for mongoose-paginate, removes 'id' from results
 * @param {Object} result - result object
 */
const cleanPaginationID = (
  result: PaginateResult<any>
): PaginateResult<any> => {
  result.docs.map((element) => delete element.id);
  return result;
};

export default cleanPaginationID;
