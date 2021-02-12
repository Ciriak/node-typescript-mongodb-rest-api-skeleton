import validator from "validator";
import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";

/**
 * Validates update profile request
 */
const validateUpdateProfile = [
  check("name")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
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

export default validateUpdateProfile;
