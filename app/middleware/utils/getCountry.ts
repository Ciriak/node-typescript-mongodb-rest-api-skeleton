import { Request } from 'express';

/**
 * Gets browser info from user
 * @param {*} req - request object
 */
const getBrowserInfo = (req: Request): string | undefined => {
  const res = req.headers['cf-ipcountry'];
  if (Array.isArray(res)) {
    return res[0];
  }
  return res;
};

export default getBrowserInfo;
