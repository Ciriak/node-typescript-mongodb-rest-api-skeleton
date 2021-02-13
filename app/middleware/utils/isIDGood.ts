import mongoose from 'mongoose';
import buildErrObject from './buildErrObject';

/**
 * Checks if given ID is good for MongoDB
 * @param {string} id - id to check
 */
const isIDGood = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const goodID = mongoose.Types.ObjectId.isValid(id);
    return goodID ? resolve(id) : reject(buildErrObject(422, 'ID_MALFORMED'));
  });
};

export default isIDGood;
