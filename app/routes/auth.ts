import { Router } from "express";
const router = Router();
import "../../config/passport";
import { authenticate } from "passport";
const requireAuth = authenticate("jwt", {
  session: false,
});
import { all } from "trim-request";

import {
  register,
  verify,
  forgotPassword,
  resetPassword,
  getRefreshToken,
  login,
  roleAuthorization,
} from "../controllers/auth";

import {
  validateRegister,
  validateVerify,
  validateForgotPassword,
  validateResetPassword,
  validateLogin,
} from "../controllers/auth/validators";

/*
 * Auth routes
 */

/*
 * Register route
 */
router.post("/register", all, validateRegister, register);

/*
 * Verify route
 */
router.post("/verify", all, validateVerify, verify);

/*
 * Forgot password route
 */
router.post("/forgot", all, validateForgotPassword, forgotPassword);

/*
 * Reset password route
 */
router.post("/reset", all, validateResetPassword, resetPassword);

/*
 * Get new refresh token
 */
router.get(
  "/token",
  requireAuth,
  roleAuthorization(["user", "admin"]),
  all,
  getRefreshToken
);

/*
 * Login route
 */
router.post("/login", all, validateLogin, login);

export default router;
