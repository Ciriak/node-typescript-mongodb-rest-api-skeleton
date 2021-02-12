import { NextFunction, Request, Response } from "express";

import { check } from "express-validator";
import validateResult from "../../../middleware/utils/validateResult";

/**
 * Validates update item request
 */
const validateUpdateCity = [
  check("name")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("id")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default validateUpdateCity;
