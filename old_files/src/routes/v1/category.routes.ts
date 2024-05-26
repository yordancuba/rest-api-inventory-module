import { Request, Response, Router } from "express";
import {
  deleteCategory,
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
} from "../../controllers/category.controllers";

const categoryRouter = Router();

/**
 * All Category Routes
 */
categoryRouter
  .get("/", getCategories)

  .get("/:id", getCategory)

  .post("/", postCategory)

  .put("/:id", updateCategory)

  .delete("/:id", deleteCategory);

export { categoryRouter };
