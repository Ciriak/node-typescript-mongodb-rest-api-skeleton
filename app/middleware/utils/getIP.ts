import requestIp, { Request } from 'request-ip';

/**
 * Gets IP from user
 * @param {*} req - request object
 */
const getIP = (req: Request): string | null => requestIp.getClientIp(req);

export default getIP;
