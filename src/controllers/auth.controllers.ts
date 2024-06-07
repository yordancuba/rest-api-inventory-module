import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import { loginUser, registerNewUser } from "../services/auth.services.js";
import { generateToken } from "../utils/jwt.handle.js";
import { matchedData } from "express-validator";
import { LoginAuth, RegisterAuth } from "../interfaces/auth.interface.js";

const JWT_SECRET = process.env.JWT_SECRET || "tokensecreto.333";

const authRegister = async (req: Request, res: Response) => {
  try {
    const body: RegisterAuth = matchedData(req);
    const responseNewUser = await registerNewUser(body);
    if (responseNewUser.status !== "OK")
      handleHttpError(res, `${responseNewUser.errorMessage}`, 400);
    else {
      if (responseNewUser.data) {
        const token = generateToken({
          email: responseNewUser.data.email,
          role: responseNewUser.data.role,
        });

        // Poner el Token en cookies por HttpOnly
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 7200000,
        });

        res.send({
          status: "OK",
          errorMessage: null,
          data: { email: responseNewUser.data.email, token },
        });
      } else handleHttpError(res, "ERROR_REGISTER", 400);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER", 400);
  }
};

const authLogin = async (req: Request, res: Response) => {
  try {
    const body: LoginAuth = matchedData(req);
    const { email, password } = body;
    const loginOneUser = await loginUser(email, password);

    if (loginOneUser.errorMessage === "USER_OR_PASSWORD_WRONG")
      return handleHttpError(res, `${loginOneUser.errorMessage}`, 403);

    if (loginOneUser.status !== "OK")
      handleHttpError(res, `${loginOneUser.errorMessage}`, 400);
    else
      res.send({
        status: "OK",
        errorMessage: null,
        data: loginOneUser.data,
      });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN", 400);
  }
};

export { authRegister, authLogin };
