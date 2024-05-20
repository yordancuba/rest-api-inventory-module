import { Prisma } from "@prisma/client";
import { Category } from "../interfaces/category.interface.js";
import { validateDataError } from "../utils/error.handle.js";
import { prisma } from "../utils/prisma.client.js";

/**
 *
 * @param param0 Name and Description from Category to add
 * @returns
 */
const addCategory = async ({ name, description }: Category) => {
  try {
    if (!name) return validateDataError("ERROR_DATA_CATEGORY");

    const categoryToAdd = await prisma.category.create({
      data: {
        name,
        description: description || "",
      },
    });

    return { status: "OK", errorMessage: null, data: categoryToAdd };
  } catch (e) {
    return validateDataError("ERROR_ADD_CATEGORY");
  }
};

/**
 *
 * @returns All Categories
 */
const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    return { status: "OK", errorMessage: null, data: categories };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    return validateDataError("ERROR_GET_CATEGORIES");
  }
};

/**
 *
 * @param id Category ID to find
 * @returns
 */
const getOneCategory = async (id: number) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!category) return validateDataError("CATEGORY_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: category };
  } catch (e) {
    throw validateDataError("ERROR_GET_CATEGORY");
  }
};

/**
 *
 * @param id Category ID to update
 * @param name Category name to update
 * @param description Category description to update
 * @returns
 */
const updateOneCategory = async (
  id: number,
  name?: string,
  description?: string
) => {
  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    if (!category) return validateDataError("CATEGORY_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: category };
  } catch (e) {
    return validateDataError("ERROR_UPDATING_CATEGORY");
  }
};

/**
 *
 * @param id Category ID to delete
 * @returns
 */
const deleteOneCategory = async (id: number) => {
  try {
    const categoryToDelete = await prisma.category.delete({
      where: {
        id,
      },
    });

    if (!categoryToDelete) return validateDataError("CATEGORY_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: categoryToDelete };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to delete does not exist.`);
    }
    return validateDataError("ERROR_DELETING_CATEGORY");
  }
};

export {
  addCategory,
  getAllCategories,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
};
