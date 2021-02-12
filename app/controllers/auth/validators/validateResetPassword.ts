import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import validateResult from "../../../middleware/utils/validateResult";

/**
 * Validates reset password request
 */
const validateResetPassword = [
  check("id")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("password")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isLength({
      min: 5,
    })
    .withMessage("PASSWORD_TOO_SHORT_MIN_5"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default validateResetPassword;
