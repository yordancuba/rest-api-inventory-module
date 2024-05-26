import { Router } from "express";
import {
  deleteImageUrl,
  getImageUrl,
  getImagesUrl,
  postImageUrl,
  updateImageUrl,
} from "../../controllers/imageUrl.controllers.js";
import { uploadMulter } from "../../utils/multer.handle.js";
import {
  validatorAddImageUrl,
  validatorUpdateOneImageUrl,
} from "../../validators/imagesUrl.validators.js";

const imageUrlRouter = Router();

imageUrlRouter
  .get("/", getImagesUrl)

  .get("/:id", getImageUrl)

  .post("/", uploadMulter.single("image"), validatorAddImageUrl, postImageUrl)

  .put("/:id", validatorUpdateOneImageUrl, updateImageUrl)

  .delete("/:id", deleteImageUrl);

export { imageUrlRouter };
