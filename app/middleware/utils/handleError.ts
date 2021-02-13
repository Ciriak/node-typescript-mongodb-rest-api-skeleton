import { Response } from "express";
import IErrorObject from "../../../interfaces/ErrorObject.interface";

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res: Response, err: IErrorObject) => {
  // Prints error in console
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }
  // Sends error to user
  // for some reason .code is not supported ?
  res.status((err as any).code).json({
    errors: {
      msg: err.message,
    },
  });
};

export default handleError;
