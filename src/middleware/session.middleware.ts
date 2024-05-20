import { NextFunction, Request, Response } from "express";
import { jwtPayloadData, verifyToken } from "../utils/jwt.handle.js";
import { handleHttpError } from "../utils/error.handle.js";
import { RequestExt } from "../interfaces/requestExtended.interfaces.js";

const checkSession = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop() || "";
    const verifyJwt = verifyToken(jwt);

    if (!verifyJwt) return handleHttpError(res, "NO_JWT_VALID", 401);

    req.userSession = jwtPayloadData(jwt);

    next();
  } catch (error) {
    return handleHttpError(res, "ERROR_SESSION", 403);
  }
};

export { checkSession };
