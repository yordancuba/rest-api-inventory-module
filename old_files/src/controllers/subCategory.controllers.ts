import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle";
import {
  addSubCategory,
  deleteOneSubCategory,
  getAllSubCategories,
  getOneSubCategory,
  updateOneSubCategory,
} from "../services/subCategory.services";
//import { SubCategory } from "@prisma/client";
import { SubCategory } from "../interfaces/subcategory.interface";

/**
 *
 * @param req Request de la petición de todas las Subcategorias
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de Subcategorias
 */
const getSubCategories = async (req: Request, res: Response) => {
  try {
    const getAllSubCateg = await getAllSubCategories();

    if (getAllSubCateg.status !== "OK") {
      handleHttpError(res, `${getAllSubCateg.errorMessage}`);
    } else {
      res.send(getAllSubCateg);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_SUBCATEGORIES");
  }
};

/**
 *
 * @param param0 Params con el id de la Subcategoria a buscar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de una Subcategoria
 */
const getSubCategory = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const idToSend = +id;

    const subCategory = await getOneSubCategory(idToSend);

    if (subCategory.status !== "OK")
      handleHttpError(res, `${subCategory.errorMessage}`, 400);
    else res.send(subCategory);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_SUB_CATEGORIES");
  }
};

/**
 *
 * @param req Request para la petición de adicionar Subcategorias
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de una Subcategoria añadida
 */
const postSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, categoryId }: SubCategory = req.body;
    const subCategoryToAdd = await addSubCategory(
      name,
      categoryId,
      description
    );

    if (subCategoryToAdd.status !== "OK") {
      handleHttpError(res, `${subCategoryToAdd.errorMessage}`, 400);
    } else {
      res.status(201).send({
        status: "OK",
        message: "La subcategoria ha sido insertada correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_POST_SUB_CATEGORY");
  }
};

/**
 *
 * @param param0 Datos correspondientes a la Subcategoria a actualizar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de una Subcategoria actualizada
 */
const updateSubCategory = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const idToSend = +id;
    const { name, description } = body;

    if (name === undefined && description === undefined) {
      handleHttpError(res, "EMPTY_FIELDS", 400);
    } else {
      const subCategoryToUpdate = await updateOneSubCategory(
        idToSend,
        name,
        description
      );
      if (subCategoryToUpdate.status !== "OK")
        handleHttpError(res, `${subCategoryToUpdate.errorMessage}`, 400);
      else {
        res.send({
          status: "OK",
          message: "La subcategoria ha sido actualizada correctamente",
          data: subCategoryToUpdate.data,
        });
      }
    }
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_SUB_CATEGORY");
  }
};

/**
 *
 * @param param0 Datos correspondientes a la Subcategoria a eliminar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de una Subcategoria eliminada
 */
const deleteSubCategory = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const idToSend = +id;
    const subCategoryToDelete = await deleteOneSubCategory(idToSend);

    if (subCategoryToDelete.status !== "OK")
      handleHttpError(res, `${subCategoryToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "La Categoria ha sido eliminada Correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_SUB_CATEGORY");
  }
};

export {
  getSubCategory,
  getSubCategories,
  postSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
