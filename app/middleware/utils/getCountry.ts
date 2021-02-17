import { Request } from 'express';

/**
 * Gets browser info from user
 * @param {*} req - request object
 */
const getCountry = (req: Request): string | undefined => {
  const res = req.headers['cf-ipcountry'] || 'XX';
  if (Array.isArray(res)) {
    return res[0];
  }
  return res;
};

export default getCountry;
