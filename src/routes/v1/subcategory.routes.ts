import { Request, Response, Router } from "express";

import {
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  postSubCategory,
  updateSubCategory,
} from "../../controllers/subCategory.controllers.js";
import {
  validatorAddSubCategory,
  validatorUpdateOneSubCategory,
} from "../../validators/subcategories.validators.js";

const subCategoryRouter = Router();

/**
 * Recovery all products
 */
subCategoryRouter
  .get("/", getSubCategories)

  .get("/:id", getSubCategory)

  .post("/", validatorAddSubCategory, postSubCategory)

  .put("/:id", validatorUpdateOneSubCategory, updateSubCategory)

  .delete("/:id", deleteSubCategory);

export { subCategoryRouter };
