import { check } from "express-validator";
import { NextFunction, Response, Request } from "express";
import { validateResult } from "../utils/validator.handle.js";

const validatorAddImageUrl = [
  check("imageUrl").exists().notEmpty().isURL(),
  check("public_id").exists().notEmpty().isString(),
  check("userId").notEmpty().isNumeric(),
  check("productId").notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
const validatorUpdateOneImageUrl = [
  check("id").exists().notEmpty().isNumeric(),
  check("imageUrl").optional().notEmpty().isString(),
  check("public_id").optional().notEmpty().isString(),
  check("userId").optional().notEmpty().isNumeric(),
  check("productId").optional().notEmpty().isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
export { validatorAddImageUrl, validatorUpdateOneImageUrl };
