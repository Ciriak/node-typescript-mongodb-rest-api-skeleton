import express from 'express';
const router = express.Router();
require('../../config/passport');
import passport from 'passport';
import roleAuthorization from '../controllers/auth/roleAuthorization';
import createCity from '../controllers/cities/createCity';
import deleteCity from '../controllers/cities/deleteCity';
import getAllCities from '../controllers/cities/getAllCities';
import getCities from '../controllers/cities/getCities';
import getCity from '../controllers/cities/getCity';
import updateCity from '../controllers/cities/updateCity';
import validateCreateCity from '../controllers/cities/validators/validateCreateCity';
import validateDeleteCity from '../controllers/cities/validators/validateDeleteCity';
import validateGetCity from '../controllers/cities/validators/validateGetCity';
import validateUpdateCity from '../controllers/cities/validators/validateUpdateCity';
import { UserRole } from '../models/user';
const requireAuth = passport.authenticate('jwt', {
  session: false
});
const trimRequest = require('trim-request');

/*
 * Cities routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllCities);

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  getCities
);

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  validateCreateCity,
  createCity
);

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  validateGetCity,
  getCity
);

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  validateUpdateCity,
  updateCity
);

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization([UserRole.ADMIN]),
  trimRequest.all,
  validateDeleteCity,
  deleteCity
);

export default router;
