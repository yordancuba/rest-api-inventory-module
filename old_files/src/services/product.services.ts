import { Prisma } from "@prisma/client";
import { Product, ProductAdd } from "../interfaces/product.interface";
import { prisma } from "../utils/prisma.client";
import { validateDataError } from "../utils/error.handle";
import { getOneSubCategory } from "./subCategory.services";

const addProduct = async (
  name: string,
  price: number,
  code: string,
  description: string | undefined,
  subCategoryId: number
) => {
  try {
    if (!name || !price || !subCategoryId || !code)
      return validateDataError("ERROR_DATA_PRODUCT");

    const searchSubCategory = await getOneSubCategory(subCategoryId);

    if (searchSubCategory.status !== "OK") {
      return validateDataError("SUBCATEGORY_NOT_FOUND");
    }

    const productToAdd = await prisma.product.create({
      data: {
        name,
        price,
        subCategoryId,
        code,
        description,
      },
    });

    return { status: "OK", errorMessage: null, data: productToAdd };
  } catch (error) {
    return validateDataError("ERROR_ADD_PRODUCT");
  }
};

const getOneProduct = async (id: number) => {
  try {
    if (!id) return validateDataError("ID_IS_REQUIRED");

    const productToFind = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productToFind) return validateDataError("PRODUCT_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: productToFind };
  } catch (e) {
    return validateDataError("ERROR_GET_PRODUCT");
  }
};

/**
 *
 * @returns All Products
 */
const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();

    return { status: "OK", errorMessage: null, data: products };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GETING_USERS");
  }
};

/**
 *
 * @param id ID del Producto a Actualizar
 * @param name Name del Producto a Actualizar
 * @param price Price del Producto a Actualizar
 * @param code Code del Producto a Actualizar
 * @param description Description del Producto a Actualizar
 * @param subCategoryId ID de la SubCategoria a la que pertenece el Producto a Actualizar
 * @returns Datos del Producto actualizado
 */
const updateOneProduct = async (
  id: number,
  name?: string,
  price?: number,
  code?: string,
  description?: string,
  subCategoryId?: number
) => {
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        code,
        description,
        subCategoryId,
      },
    });

    if (!product) return validateDataError("PRODUCT_NOT_FOUND");

    return {
      status: "OK",
      errorMessage: null,
      data: { product },
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_DELETING_PRODUCT");
  }
};

const deleteOneProduct = async (id: number) => {
  try {
    const productToDelete = await prisma.product.delete({
      where: {
        id,
      },
    });

    if (!productToDelete || productToDelete === undefined)
      return validateDataError("PRODUCT_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: productToDelete };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_DELETING_PRODUCT");
  }
};

export {
  addProduct,
  getOneProduct,
  getAllProducts,
  updateOneProduct,
  deleteOneProduct,
};
