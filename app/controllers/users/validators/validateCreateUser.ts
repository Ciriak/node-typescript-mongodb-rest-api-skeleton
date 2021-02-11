import validator from "validator";
import { check } from "express-validator";
import validateResult from "../../../middleware/utils/validateResult";
import { NextFunction, Request, Response } from "express";

/**
 * Validates create new item request
 */
const validateCreateUser = [
  check("name")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
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
  check("role")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isIn(["user", "admin"])
    .withMessage("USER_NOT_IN_KNOWN_ROLE"),
  check("phone")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .trim(),
  check("city")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .trim(),
  check("country")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .trim(),
  check("urlTwitter")
    .optional()
    .custom((v) => (v === "" ? true : validator.isURL(v)))
    .withMessage("NOT_A_VALID_URL"),
  check("urlGitHub")
    .optional()
    .custom((v) => (v === "" ? true : validator.isURL(v)))
    .withMessage("NOT_A_VALID_URL"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default validateCreateUser;
