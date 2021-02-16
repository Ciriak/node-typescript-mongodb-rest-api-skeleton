import ISuccessObject from '../../../interfaces/SuccessObject.interface';

/**
 * Builds success object
 * @param {string} message - success text
 */
const buildSuccObject = (message: string): ISuccessObject => {
  return {
    msg: message
  };
};

export default buildSuccObject;
