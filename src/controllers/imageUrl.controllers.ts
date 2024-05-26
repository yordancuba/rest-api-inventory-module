import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import { cloudinaryApi } from "../utils/cloudinary.handle.js";
import { addImageUrl } from "../services/imageUrl.services.js";

/**
 * Devolvera la URL de la imagen dependiendo del Id
 * @param req
 * @param res
 */
const getImageUrl = async (req: Request, res: Response) => {
  try {
    res.send("Solicitando una Imagen");
  } catch (error) {
    handleHttpError(res, "ERROR_GET_IMAGE");
  }
};

/**
 * Devolvera todas las URL de las imagenes guardadas
 * @param req
 * @param res
 */
const getImagesUrl = async (req: Request, res: Response) => {
  try {
    res.send("Solicitando todas las imagenes");
  } catch (error) {
    handleHttpError(res, "ERROR_GET_IMAGES");
  }
};

/**
 * Adicionara los datos de una imagen subida a la tabla ImagesUrl y guardara la imagen en Cloudinary
 * @param req
 * @param res
 * @returns
 */
const postImageUrl = async (req: Request, res: Response) => {
  try {
    const imageToUpload = req.file?.path;
    const { productId, userId } = req.body;

    if (!imageToUpload) {
      return handleHttpError(res, "NOT_IMAGE_FILE_TO_UPLOAD");
    }

    if (
      (imageToUpload.split(".").pop() !== ".jpeg" ||
        imageToUpload.split(".").pop() !== ".jpg",
      imageToUpload.split(".").pop() !== ".png")
    )
      return handleHttpError(res, "FILE_IS_NOT_AN_IMAGE");

    if (!productId && !userId)
      return handleHttpError(res, "NOT_PRODUCTID_OR_USERID_FOR_IMAGE");

    const addImageToCloudinary = await addImageUrl(
      imageToUpload,
      productId,
      userId
    );

    if (addImageToCloudinary.status !== "OK")
      return handleHttpError(res, `${addImageToCloudinary.errorMessage}`);
    else {
      res.status(201).send({
        status: "OK",
        errorMessage: null,
        data: { image_url: addImageToCloudinary.data },
      });
    }
  } catch (error) {
    handleHttpError(res, "Error uploading image");
  }
};

/**
 * Actualizara los datos de una imagen en la tabla ImagesUrl
 * @param req
 * @param res
 */
const updateImageUrl = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_IMAGE");
  }
};

/**
 * Eliminara los datos de una imagen en la tabla ImagesUrl y la eliminara de Cloudinary
 * @param req
 * @param res
 */
const deleteImageUrl = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_IMAGE");
  }
};

export {
  getImageUrl,
  getImagesUrl,
  postImageUrl,
  updateImageUrl,
  deleteImageUrl,
};
