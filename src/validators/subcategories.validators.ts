import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";
import { NextFunction, Response, Request } from "express";

const validatorAddSubCategory = [
  check("name").exists().notEmpty().isLength({ min: 3 }).isString(),
  check("description").optional().isLength({ min: 5 }).isString(),
  check("categoryId").exists().notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneSubCategory = [
  check("id").exists().notEmpty().isNumeric(),
  check("name").optional().notEmpty().isLength({ min: 3 }).isString(),
  check("description").optional().notEmpty().isLength({ min: 5 }).isString(),
  check("categoryId").optional().notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
export { validatorAddSubCategory, validatorUpdateOneSubCategory };
