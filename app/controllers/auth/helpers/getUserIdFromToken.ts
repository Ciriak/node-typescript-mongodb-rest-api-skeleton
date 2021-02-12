import jwt from "jsonwebtoken";
import decrypt from "../../../middleware/auth/decrypt";
import buildErrObject from "../../../middleware/utils/buildErrObject";

const secret = process.env.JWT_SECRET || "";

/**
 * Gets user id from token
 * @param {string} token - Encrypted and encoded token
 */
const getUserIdFromToken = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Decrypts, verifies and decode token
    const decryptedToken = decrypt(token);
    const decoded = jwt.verify(decryptedToken, secret);
    if (!decoded) {
      reject(buildErrObject(409, "BAD_TOKEN"));
    }
    resolve((decoded as any).data._id);
  });
};

export default getUserIdFromToken;
