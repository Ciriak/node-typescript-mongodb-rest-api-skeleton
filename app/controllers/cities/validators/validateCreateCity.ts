import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import validateResult from '../../../middleware/utils/validateResult';

/**
 * Validates create new item request
 */
const validateCreateCity = [
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];

export default validateCreateCity;
