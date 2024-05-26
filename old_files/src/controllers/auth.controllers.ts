import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle";
import { loginUser, registerNewUser } from "../services/auth.services";
import { generateToken } from "../utils/jwt.handle";
import { Auth, LoginAuth } from "../interfaces/auth.interface";

const authRegister = async (req: Request, res: Response) => {
  try {
    const responseNewUser = await registerNewUser(req.body);
    if (responseNewUser.status !== "OK")
      handleHttpError(res, `${responseNewUser.errorMessage}`, 400);
    else {
      /* const token = generateToken({
        name: responseNewUser.data!.name,
        email: responseNewUser.data!.email,
        role: responseNewUser.data!.role,
      }); */
      if (responseNewUser.data) {
        const token = generateToken({
          email: responseNewUser.data.email,
          role: responseNewUser.data.role,
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
    const { email, password } = req.body;
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
