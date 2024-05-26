import { Request, Response, Router } from "express";
import {
  deleteCategory,
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
} from "../../controllers/category.controllers.js";
import {
  validatorAddCategory,
  validatorUpdateOneCategory,
} from "../../validators/categories.validators.js";

const categoryRouter = Router();

/**
 * All Category Routes
 */
categoryRouter
  .get("/", getCategories)

  .get("/:id", getCategory)

  .post("/", validatorAddCategory, postCategory)

  .put("/:id", validatorUpdateOneCategory, updateCategory)

  .delete("/:id", deleteCategory);

export { categoryRouter };
