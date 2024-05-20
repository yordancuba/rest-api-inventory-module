import { Prisma } from "@prisma/client";
import { validateDataError } from "../utils/error.handle.js";
import { prisma } from "../utils/prisma.client.js";
import { getOneCategory } from "./category.services.js";

/**
 *
 * @param param0 Name and Description from SubCategory to add
 * @returns
 */
const addSubCategory = async (
  name: string,
  categoryId: number,
  description?: string | null
) => {
  try {
    if (!name || !categoryId)
      return validateDataError("ERROR_DATA_SUBCATEGORY");

    const searchCategory = await getOneCategory(categoryId);

    if (searchCategory.status !== "OK") {
      return validateDataError("CATEGORY_NOT_FOUND");
    }

    const subCategoryToAdd = await prisma.subCategory.create({
      data: {
        name,
        categoryId,
        description: description || "",
      },
    });

    return { status: "OK", errorMessage: null, data: subCategoryToAdd };
  } catch (e) {
    return validateDataError("ERROR_ADD_SUBCATEGORY");
  }
};

/**
 *
 * @returns All SubCategories
 */
const getAllSubCategories = async () => {
  try {
    const subCategories = await prisma.subCategory.findMany();

    return { status: "OK", errorMessage: null, data: subCategories };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GET_SUBCATEGORIES");
  }
};

/**
 *
 * @param id SubCategory ID to find
 * @returns
 */
const getOneSubCategory = async (id: number) => {
  try {
    const category = await prisma.subCategory.findFirst({
      where: {
        id,
      },
    });

    if (!category) return validateDataError("SUBCATEGORY_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: category };
  } catch (e) {
    return validateDataError("ERROR_GET_CATEGORY");
  }
};

/**
 *
 * @param id SubCategory ID to update
 * @param name SubCategory name to update
 * @param description SubCategory description to update
 * @returns
 */
const updateOneSubCategory = async (
  id: number,
  name?: string,
  description?: string
) => {
  try {
    const subCategory = await prisma.subCategory.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    if (!subCategory) return validateDataError("SUBCATEGORY_NOT_FOUND");

    return {
      status: "OK",
      errorMessage: null,
      data: { name: subCategory.name, description: subCategory.description },
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`SubCategory to update does not exist.`);
    }
    return validateDataError("ERROR_UPDATING_SUBCATEGORY");
  }
};

/**
 *
 * @param id SubCategory ID to delete
 * @returns
 */
const deleteOneSubCategory = async (id: number) => {
  try {
    const categoryToDelete = await prisma.category.delete({
      where: {
        id,
      },
    });

    if (!categoryToDelete || categoryToDelete === undefined)
      return validateDataError("CATEGORY_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: categoryToDelete };
  } catch (e) {
    return validateDataError("ERROR_DELETING_CATEGORY");
  }
};

export {
  addSubCategory,
  getAllSubCategories,
  getOneSubCategory,
  updateOneSubCategory,
  deleteOneSubCategory,
};
