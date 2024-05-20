import { Prisma } from "@prisma/client";
import { validateDataError } from "../utils/error.handle.js";
import { prisma } from "../utils/prisma.client.js";
import { getOneProduct } from "./product.services.js";

/**
 *
 * @param param0 image url and productId
 * @returns
 */
const addImageUrl = async (imageUrl: string, productId: number) => {
  try {
    if (!imageUrl || !productId) return validateDataError("FIELDS_EMPTY");

    const searchImage = await getOneProduct(productId);

    if (!searchImage) {
      return validateDataError("ERROR_SEARCHING_IMAGE");
    }

    const imageToAdd = await prisma.imageUrl.create({
      data: {
        imageUrl,
        productId,
      },
    });

    return { status: "OK", errorMessage: null, data: imageToAdd };
  } catch (e) {
    return validateDataError("ERROR_ADD_IMAGE");
  }
};

/**
 *
 * @returns All Images url
 */
const getAllImageUrl = async () => {
  try {
    const imageUrl = await prisma.imageUrl.findMany();

    return { status: "OK", errorMessage: null, data: imageUrl };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GET_IMAGES");
  }
};

/**
 *
 * @param id ImageUrl ID to find
 * @returns
 */
const getOneImageUrl = async (id: number) => {
  try {
    const imageUrl = await prisma.imageUrl.findFirst({
      where: {
        id,
      },
    });

    if (!imageUrl) return validateDataError("IMAGE_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: imageUrl };
  } catch (e) {
    return validateDataError("ERROR_GET_IMAGE");
  }
};

/**
 *
 * @param id ImageUrl ID to update
 * @param imageUrl ImageUrl url to update
 * @returns
 */
const updateOneImageUrl = async (id: number, imageUrl: string) => {
  try {
    const imageUrlUpdate = await prisma.imageUrl.update({
      where: {
        id,
      },
      data: {
        imageUrl,
      },
    });

    if (!imageUrlUpdate) return validateDataError("IMAGE_NOT_FOUND");

    return {
      status: "OK",
      errorMessage: null,
      data: { imageUrl },
    };
  } catch (e) {
    return validateDataError("ERROR_GET_IMAGE");
  }
};

/**
 *
 * @param id imageUrl ID to delete
 * @returns
 */
const deleteOneImageUrl = async (id: number) => {
  try {
    const imageUrlToDelete = await prisma.imageUrl.delete({
      where: {
        id,
      },
    });

    if (!imageUrlToDelete || imageUrlToDelete === undefined)
      return validateDataError("IMAGE_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: imageUrlToDelete };
  } catch (e) {
    return validateDataError("ERROR_DELETING_IMAGE");
  }
};

export {
  addImageUrl,
  getAllImageUrl,
  getOneImageUrl,
  updateOneImageUrl,
  deleteOneImageUrl,
};
