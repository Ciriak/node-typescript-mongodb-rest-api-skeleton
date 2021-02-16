/**
 * Gets country from user using CloudFlare header 'cf-ipcountry'
 * @param {*} req - request object
 */
const getCountry = ({
  headers
}: {
  headers: {
    'cf-ipcountry': string;
  };
}): string => (headers['cf-ipcountry'] ? headers['cf-ipcountry'] : 'XX');

export default getCountry;
