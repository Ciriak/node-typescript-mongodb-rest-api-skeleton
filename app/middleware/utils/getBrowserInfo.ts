/**
 * Gets browser info from user
 * @param {*} req - request object
 */
const getBrowserInfo = ({
  headers
}: {
  headers: {
    'user-agent': string;
  };
}): string => headers['user-agent'];

export default getBrowserInfo;
