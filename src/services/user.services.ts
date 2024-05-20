import { Prisma } from "@prisma/client";
import { validateDataError } from "../utils/error.handle.js";
import { prisma } from "../utils/prisma.client.js";

/**
 *
 * @returns All Users
 */
const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    const usersToSend = users.map(({ id, name, email }) => {
      const user = {
        id,
        name,
        email,
      };
      return user;
    });

    return {
      status: "OK",
      errorMessage: null,
      data: usersToSend,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    return validateDataError("ERROR_GET_USERS");
  }
};

/**
 *
 * @param id USER ID to find
 * @returns  One User
 */
const getOneUser = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) return validateDataError("USER_NOT_FOUND");

    const userToSend = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return { status: "OK", errorMessage: null, data: userToSend };
  } catch (e) {
    throw validateDataError("ERROR_GET_USER");
  }
};

/**
 *
 * @param id User ID to update
 * @param name User name to update
 * @param email User email to update
 * @param password User password to update
 * @returns
 */
const updateOneUser = async (id: number, name?: string, email?: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });

    if (!user) return validateDataError("USER_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: { name, email } };
  } catch (e) {
    return validateDataError("ERROR_UPDATE_USER");
  }
};

/**
 *
 * @param id USER ID to delete
 * @returns
 */
const deleteOneUser = async (id: number) => {
  try {
    const userToDelete = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!userToDelete) return validateDataError("USER_NOT_FOUND");

    return {
      status: "OK",
      errorMessage: null,
      data: { name: userToDelete.name, email: userToDelete.email },
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to delete does not exist.`);
    }
    return validateDataError("ERROR_DELETING_USER");
  }
};

const changeOneUserRole = async (id: number) => {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: "USER" ? "ADMIN" : "USER",
      },
    });
    return {
      status: "OK",
      errorMessage: null,
      data: { name: user.name, email: user.email },
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to delete does not exist.`);
    }
    return validateDataError("ERROR_DELETING_USER");
  }
};

export {
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  changeOneUserRole,
};
