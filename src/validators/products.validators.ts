import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";
import { NextFunction, Response, Request } from "express";

const validatorAddProduct = [
  check("name").exists().notEmpty().isLength({ min: 3 }).isString(),
  check("price").exists().notEmpty().isNumeric(),
  check("code").exists().notEmpty().isString(),
  check("subCategoryId").exists().notEmpty().isNumeric(),
  check("description").optional().isLength({ min: 5 }).isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneProduct = [
  check("id").exists().notEmpty().isNumeric(),
  check("name").optional().notEmpty().isLength({ min: 3 }).isString(),
  check("code").optional().notEmpty().isString(),
  check("description").optional().notEmpty().isLength({ min: 5 }).isString(),
  check("subCategoryId").optional().notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

export { validatorAddProduct, validatorUpdateOneProduct };
