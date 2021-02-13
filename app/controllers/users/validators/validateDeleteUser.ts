import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import validateResult from '../../../middleware/utils/validateResult';

/**
 * Validates delete item request
 */
const validateDeleteUser = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];

export default validateDeleteUser;
