import { Router } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  postProduct,
  updateProduct,
} from "../../controllers/product.controllers";

const productRouter = Router();

/**
 * Recovery all products
 */
productRouter
  .get("/", getProducts)

  .get("/:id", getProduct)

  .post("/", postProduct)

  .put("/:id", updateProduct)

  .delete("/:id", deleteProduct);

export { productRouter };
