import express, { Request, Response } from 'express';
const router = express.Router();

/*
 * Import routes manually
 */

import auth from './auth';
import cities from './cities';
import profile from './profile';
import users from './users';

// Load Auth route
router.use('/', auth);
router.use('/cities', cities);
router.use('/profile', profile);
router.use('/users', users);
/*
 * Setup routes for index
 */
router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

/*
 * Handle 404 error
 */
router.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  });
});

export default router;
