/**
 * Gets browser info from user
 * @param {*} req - request object
 */
const getBrowserInfo = ({ headers }: { headers: any }) => headers["user-agent"];

export default getBrowserInfo;
