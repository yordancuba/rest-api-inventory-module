import { RequestExt } from "../interfaces/requestExtended.interfaces";
import { User } from "../interfaces/user.interface";
import { handleHttpError } from "../utils/error.handle";
import { prisma } from "../utils/prisma.client";
import { Response, NextFunction } from "express";

const isAdmin = async (req: RequestExt, res: Response, next: NextFunction) => {
  const user = req.userSession;
  try {
    if (user?.role !== "ADMIN")
      return handleHttpError(res, "AUTHORIZATION_ERROR");

    if (user.role === undefined) handleHttpError(res, "AUTHORIZATION_ERROR");

    next();
  } catch (error) {
    handleHttpError(res, "AUTHORIZATION_ERROR");
  }
};

export { isAdmin };
