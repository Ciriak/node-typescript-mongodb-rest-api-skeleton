import { Router } from "express";
const router = Router();
import "../../config/passport";
import { authenticate } from "passport";
const requireAuth = authenticate("jwt", {
  session: false,
});
const trimRequest = require("trim-request");
import verify from "../controllers/auth/verify";
import { UserRole } from "../models/user";
import roleAuthorization from "../controllers/auth/roleAuthorization";
import login from "../controllers/auth/login";
import register from "../controllers/auth/register";
import forgotPassword from "../controllers/auth/forgotPassword";
import validateLogin from "../controllers/auth/validators/validateLogin";
import validateVerify from "../controllers/auth/validators/validateVerify";
import validateRegister from "../controllers/auth/validators/validateRegister";
import validateForgotPassword from "../controllers/auth/validators/validateForgotPassword";
import validateResetPassword from "../controllers/auth/validators/validateResetPassword";
import getRefreshToken from "../controllers/auth/getRefreshToken";
import resetPassword from "../controllers/auth/resetPassword";

/*
 * Auth routes
 */

/*
 * Register route
 */
router.post("/register", trimRequest.all, validateRegister, register);

/*
 * Verify route
 */
router.post("/verify", trimRequest.all, validateVerify, verify);

/*
 * Forgot password route
 */
router.post("/forgot", trimRequest.all, validateForgotPassword, forgotPassword);

/*
 * Reset password route
 */
router.post("/reset", trimRequest.all, validateResetPassword, resetPassword);

/*
 * Get new refresh token
 */
router.get(
  "/token",
  requireAuth,
  roleAuthorization([UserRole.USER, UserRole.ADMIN]),
  trimRequest.all,
  getRefreshToken
);

/*
 * Login route
 */
router.post("/login", trimRequest.all, validateLogin, login);

export default router;
