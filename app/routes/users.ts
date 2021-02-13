import express from 'express';
const router = express.Router();
require('../../config/passport');
import passport from 'passport';
import roleAuthorization from '../controllers/auth/roleAuthorization';
import deleteUser from '../controllers/users/deleteUser';
import getUser from '../controllers/users/getUser';
import getUsers from '../controllers/users/getUsers';
import updateUser from '../controllers/users/updateUser';
import validateDeleteUser from '../controllers/users/validators/validateDeleteUser';
import validateGetUser from '../controllers/users/validators/validateGetUser';
import validateUpdateUser from '../controllers/users/validators/validateUpdateUser';
import validateCreateUser from '../controllers/users/validators/validateCreateUser';
import createUser from '../controllers/users/createUser';
import { UserRole } from '../models/user';
const requireAuth = passport.authenticate('jwt', {
  session: false
});
const trimRequest = require('trim-request');

/*
 * Users routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  getUsers
);

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  validateCreateUser,
  createUser
);

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  validateGetUser,
  getUser
);

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  validateUpdateUser,
  updateUser
);

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  validateDeleteUser,
  deleteUser
);

export default router;
