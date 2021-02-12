import { IUser } from "../../../models/user";
import generateToken from "./generateToken";

/**
 * Builds the registration token
 * @param {Object} item - user object that contains created id
 * @param {Object} userInfo - user object
 */
const returnRegisterToken = (
  {
    _id,
    verification,
  }: {
    _id: string;
    verification: string;
  },
  userInfo: IUser
): Promise<{
  token: string;
  user: IUser;
}> => {
  return new Promise((resolve) => {
    if (process.env.NODE_ENV !== "production") {
      userInfo.verification = verification;
    }
    const data = {
      token: generateToken(_id),
      user: userInfo,
    };
    resolve(data);
  });
};

export default returnRegisterToken;
