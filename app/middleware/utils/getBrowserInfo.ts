import { Request } from 'express';

/**
 * Gets browser info from user
 * @param {*} req - request object
 */
const getBrowserInfo = (req: Request): string | undefined => {
  return req.headers['user-agent'];
};

export default getBrowserInfo;
