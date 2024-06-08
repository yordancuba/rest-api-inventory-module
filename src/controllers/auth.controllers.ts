import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import { loginUser, registerNewUser } from "../services/auth.services.js";
import { generateToken, verifyToken } from "../utils/jwt.handle.js";
import { matchedData } from "express-validator";
import { LoginAuth, RegisterAuth } from "../interfaces/auth.interface.js";
import { prisma } from "../utils/prisma.client.js";

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
          id: responseNewUser.data.id,
          email: responseNewUser.data.email,
          role: responseNewUser.data.role,
        });

        // Poner el Token en cookies por HttpOnly
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "none",
          maxAge: 7200000,
        });

        res.send({
          status: "OK",
          errorMessage: null,
          data: {
            id: responseNewUser.data.id,
            email: responseNewUser.data.email,
            token,
          },
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
      return handleHttpError(res, `${loginOneUser.errorMessage}`, 400);

    // Poner el Token en cookies por HttpOnly
    res.cookie("token", loginOneUser.data?.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
      maxAge: 7200000,
    });

    res.send({
      status: "OK",
      errorMessage: null,
      data: loginOneUser.data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_LOGIN", 400);
  }
};

const authLogout = async (req: Request, res: Response) => {
  try {
    const cookieJwt = req.cookies.token;

    if (!cookieJwt) return handleHttpError(res, "NO_SESSION", 401);

    await prisma.blackListToken.create({
      data: {
        token: cookieJwt,
      },
    });

    // Para eliminar la cookie.
    //*Es necesario ponerle en el primer parametro el mismo nombre que cuando se crea la cookie en Register o Login (en este caso "token")
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.send({
      status: "OK",
      errorMessage: null,
      data: "Ha cerrado la sesion correctamente",
    });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN", 400);
  }
};

export { authRegister, authLogin, authLogout };
