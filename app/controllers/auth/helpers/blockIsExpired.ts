const LOGIN_ATTEMPTS = 5;

/**
 * Checks that login attempts are greater than specified in constant and also that blockexpires is less than now
 * @param {Object} user - user object
 */
const blockIsExpired = ({
  loginAttempts = 0,
  blockExpires = new Date()
}: {
  loginAttempts: number;
  blockExpires: Date;
}) => loginAttempts > LOGIN_ATTEMPTS && blockExpires <= new Date();

export default blockIsExpired;
