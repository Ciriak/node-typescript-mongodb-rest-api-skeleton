import express from 'express';
const router = express.Router();

require('../../config/passport');
import passport from 'passport';
import roleAuthorization from '../controllers/auth/roleAuthorization';
import { UserRole } from '../models/user';
const requireAuth = passport.authenticate('jwt', {
  session: false
});

const trimRequest = require('trim-request');
import getProfile from '../controllers/profile/getProfile';
import validateUpdateProfile from '../controllers/profile/validators/validateUpdateProfile';
import updateProfile from '../controllers/profile/updateProfile';
import validateChangePassword from '../controllers/profile/validators/validateChangePassword';
import changePassword from '../controllers/profile/changePassword';

/*
 * Profile routes
 */

/*
 * Get profile route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization([UserRole.USER, UserRole.ADMIN]),
  trimRequest.all,
  getProfile
);

/*
 * Update profile route
 */
router.patch(
  '/',
  requireAuth,
  roleAuthorization([UserRole.USER, UserRole.ADMIN]),
  trimRequest.all,
  validateUpdateProfile,
  updateProfile
);

/*
 * Change password route
 */
router.post(
  '/changePassword',
  requireAuth,
  roleAuthorization([UserRole.USER, UserRole.ADMIN]),
  trimRequest.all,
  validateChangePassword,
  changePassword
);

export default router;
