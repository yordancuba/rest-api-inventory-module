import { Prisma } from "@prisma/client";
import { validateDataError } from "../utils/error.handle.js";
import { prisma } from "../utils/prisma.client.js";
import { getOneProduct } from "./product.services.js";
import { cloudinaryApi } from "../utils/cloudinary.handle.js";
import { getOneUser } from "./user.services.js";

/**
 *
 * @param param0 image url and productId
 * @returns
 */
const addImageUrl = async (
  imageUrl: string,
  productId?: number,
  userId?: number
) => {
  try {
    const idUserToString = String(userId);
    const idUserToNumber = parseInt(idUserToString, 10);
    const idProductToString = String(productId);
    const idProductToNumber = parseInt(idProductToString, 10);

    if (!imageUrl) return validateDataError("IMAGE_PATH_EMPTY");
    if (!productId && !userId)
      return validateDataError("NOT_PRODUCTID_OR_USERID_FOR_IMAGE");

    if (productId) {
      const searchProductForImage = await getOneProduct(idProductToNumber);
      if (searchProductForImage.status !== "OK") {
        return validateDataError("PRODUCTID_NOT_FOUND");
      }
    }

    if (userId) {
      const searchUserForImage = await getOneUser(idUserToNumber);
      if (searchUserForImage.status !== "OK") {
        return validateDataError("USERID_NOT_FOUND");
      }
    }

    // Upload image to Cloudinary
    const imageUploaded = await cloudinaryApi.v2.uploader.upload(imageUrl);

    const imageToAdd = await prisma.imageUrl.create({
      data: {
        imageUrl: imageUploaded.secure_url,
        public_id: imageUploaded.public_id,
        productId: idProductToNumber,
        userId: idUserToNumber,
      },
    });

    if (!imageToAdd)
      return validateDataError("ERROR_ADD_IMAGE_TO_IMAGEURL_TABLE");

    return { status: "OK", errorMessage: null, data: imageUploaded };
  } catch (e) {
    console.log(e);

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
const updateOneImageUrl = async (
  id: number | undefined,
  imageUrl: string,
  public_id: string,
  userId?: number,
  productId?: number
) => {
  try {
    const imageUrlUpdate = await prisma.imageUrl.update({
      where: {
        id,
      },
      data: {
        imageUrl,
        public_id,
        userId,
        productId,
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
