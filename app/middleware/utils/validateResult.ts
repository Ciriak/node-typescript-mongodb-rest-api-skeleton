import { validationResult } from 'express-validator';
import handleError from './handleError';
import buildErrObject from './buildErrObject';
import { NextFunction, Request, Response } from 'express';

/**
 * Builds error for validation files
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next object
 */
const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    validationResult(req).throw();
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    return next();
  } catch (err) {
    return handleError(res, buildErrObject(422, err.array()));
  }
};

export default validateResult;
