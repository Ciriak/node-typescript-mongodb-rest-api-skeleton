import jwt from "jsonwebtoken";
import encrypt from "../../../middleware/auth/encrypt";

const expirationTime = parseInt(process.env.JWT_EXPIRATION_IN_MINUTES || "60");

/**
 * Generates a token
 * @param {string} id - user id
 */
const generateToken = (id: string) => {
  try {
    // Gets expiration time
    const expiration = Math.floor(Date.now() / 1000) + 60 * expirationTime;

    // returns signed and encrypted token
    return encrypt(
      jwt.sign(
        {
          data: {
            _id: id,
          },
          exp: expiration,
        },
        process.env.JWT_SECRET || ""
      )
    );
  } catch (error) {
    throw error;
  }
};

export default generateToken;
