import { IUser } from '../../../models/user';

/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req: IUser): Promise<IUser> => {
  return new Promise((resolve) => {
    let user = {
      _id: req._id,
      name: req.name,
      email: req.email,
      role: req.role,
      verified: req.verified
    } as IUser;
    // Adds verification for testing purposes
    if (process.env.NODE_ENV !== 'production') {
      user = {
        ...user,
        verification: req.verification
      } as IUser;
    }
    resolve(user);
  });
};

export default setUserInfo;
