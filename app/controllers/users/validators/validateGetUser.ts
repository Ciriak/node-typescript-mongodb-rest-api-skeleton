import { NextFunction, Request, Response } from "express";

import { check } from "express-validator";
import validateResult from "../../../middleware/utils/validateResult";

/**
 * Validates get item request
 */
const validateGetUser = [
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

export default validateGetUser;
