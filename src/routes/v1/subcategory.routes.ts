import { Request, Response, Router } from "express";

import {
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  postSubCategory,
  updateSubCategory,
} from "../../controllers/subCategory.controllers.js";

const subCategoryRouter = Router();

/**
 * Recovery all products
 */
subCategoryRouter
  .get("/", getSubCategories)

  .get("/:id", getSubCategory)

  .post("/", postSubCategory)

  .put("/:id", updateSubCategory)

  .delete("/:id", deleteSubCategory);

export { subCategoryRouter };
