/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
const buildErrObject = (code: number, message: string) => {
  return {
    code,
    message,
  };
};

export default buildErrObject;
