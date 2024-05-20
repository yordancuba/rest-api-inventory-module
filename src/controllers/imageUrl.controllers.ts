import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";

const getImageUrl = async (req: Request, res: Response) => {
  try {
    res.send("Solicitando una Imagen");
  } catch (error) {
    handleHttpError(res, "ERROR_GET_IMAGE");
  }
};
const getImagesUrl = async (req: Request, res: Response) => {
  try {
    res.send("Solicitando todas las imagenes");
  } catch (error) {
    handleHttpError(res, "ERROR_GET_IMAGES");
  }
};
const postImageUrl = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttpError(res, "ERROR_POST_IMAGE");
  }
};
const updateImageUrl = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_IMAGE");
  }
};
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
