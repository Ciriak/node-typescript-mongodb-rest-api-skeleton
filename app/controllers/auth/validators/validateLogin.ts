import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import validateResult from "../../../middleware/utils/validateResult";

/**
 * Validates register request
 */
/**
 * Validates login request
 */
const validateLogin = [
  check("email")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isEmail()
    .withMessage("EMAIL_IS_NOT_VALID"),
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

export default validateLogin;
