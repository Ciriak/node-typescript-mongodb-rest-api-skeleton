import { Request } from "express";
import passport from "passport";
import User, { IUser } from "../app/models/user";
import { Strategy } from "passport-jwt";
import decrypt from "../app/middleware/auth/decrypt";

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = (req: Request): string => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "").trim();
  } else if (req.body.token) {
    token = req.body.token.trim();
  } else if (req.query.token) {
    token = String(req.query.token).trim();
  }
  if (token) {
    // Decrypts token
    token = decrypt(token);
  }
  return token;
};

/**
 * Options object for jwt middlware
 */
const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

/**
 * Login with JWT middleware
 */
const jwtLogin = new Strategy(jwtOptions, (payload: any, done: Function) => {
  User.findById(payload.data._id, (err: Error, user: IUser) => {
    if (err) {
      return done(err, false);
    }
    return !user ? done(null, false) : done(null, user);
  });
});

passport.use(jwtLogin);
