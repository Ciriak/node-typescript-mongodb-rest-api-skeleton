import { v4 } from "uuid";
import buildErrObject from "../../../middleware/utils/buildErrObject";
import User, { IUser } from "../../../models/user";

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = (req: IUser): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const user = new User({
      name: req.name,
      email: req.email,
      password: req.password,
      verification: v4(),
    });
    user.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message));
      }
      resolve(item);
    });
  });
};

export default registerUser;
