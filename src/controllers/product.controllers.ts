import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import {
  addProduct,
  deleteOneProduct,
  getAllProducts,
  getOneProduct,
  updateOneProduct,
} from "../services/product.services.js";
import { Product, ProductAdd } from "../interfaces/product.interface.js";

/**
 *
 * @param req
 * @param res
 */
const getProduct = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const idToSend = +id;

    const product = await getOneProduct(idToSend);

    if (product.status !== "OK")
      handleHttpError(res, `${product.errorMessage}`, 400);
    else res.send(product);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_SUB_CATEGORIES");
  }
};

/**
 *
 * @param req
 * @param res
 */
const getProducts = async (req: Request, res: Response) => {
  try {
    const getAllProd = await getAllProducts();

    if (getAllProd.status !== "OK") {
      handleHttpError(res, `${getAllProd.errorMessage}`);
    } else {
      res.send(getAllProd);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_SUBCATEGORIES");
  }
};

/**
 *
 * @param req
 * @param res
 */
const postProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, code, description, subCategoryId }: Product = req.body;

    const productToAdd = await addProduct(
      name,
      price,
      code,
      description,
      subCategoryId
    );

    if (productToAdd.status !== "OK") {
      handleHttpError(res, `${productToAdd.errorMessage}`, 400);
    } else {
      res.status(201).send({
        status: "OK",
        message: "El Producto ha sido insertado correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_POST_SUB_CATEGORY");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const updateProduct = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const idToSend = +id;
    const { name, description, code, price, subCategoryId }: Product = body;

    if (
      name === undefined &&
      description === undefined &&
      code === undefined &&
      price === undefined &&
      subCategoryId === undefined
    ) {
      handleHttpError(res, "EMPTY_DATA_FIELDS", 400);
    } else {
      const productToUpdate = await updateOneProduct(
        idToSend,
        name,
        price,
        code,
        description,
        subCategoryId
      );
      if (productToUpdate.status !== "OK")
        handleHttpError(res, `${productToUpdate.errorMessage}`, 400);
      else {
        res.send({
          status: "OK",
          message: "El Producto ha sido actualizado correctamente",
          data: productToUpdate.data,
        });
      }
    }
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_SUB_CATEGORY");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const deleteProduct = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const idToSend = +id;
    const productToDelete = await deleteOneProduct(idToSend);

    if (productToDelete.status !== "OK")
      handleHttpError(res, `${productToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "El Producto ha sido eliminado correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_PRODUCT");
  }
};

export { getProduct, getProducts, postProduct, updateProduct, deleteProduct };
