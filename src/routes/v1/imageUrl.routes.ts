import { Router } from "express";
import {
  deleteImageUrl,
  getImageUrl,
  getImagesUrl,
  postImageUrl,
  updateImageUrl,
} from "../../controllers/imageUrl.controllers";

const imageUrlRouter = Router();

/**
 * Recovery all products
 */
imageUrlRouter
  .get("/", getImagesUrl)

  .get("/:id", getImageUrl)

  .post("/", postImageUrl)

  .put("/:id", updateImageUrl)

  .delete("/:id", deleteImageUrl);

export { imageUrlRouter };
