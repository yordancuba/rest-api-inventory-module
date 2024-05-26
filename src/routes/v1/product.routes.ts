import { Router } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  postProduct,
  updateProduct,
} from "../../controllers/product.controllers.js";
import {
  validatorAddProduct,
  validatorUpdateOneProduct,
} from "../../validators/products.validators.js";

const productRouter = Router();

/**
 * Recovery all products
 */
productRouter
  .get("/", getProducts)

  .get("/:id", getProduct)

  .post("/", validatorAddProduct, postProduct)

  .put("/:id", validatorUpdateOneProduct, updateProduct)

  .delete("/:id", deleteProduct);

export { productRouter };
