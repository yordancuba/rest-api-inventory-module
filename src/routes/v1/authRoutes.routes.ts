import { Router } from "express";
import {
  authLogin,
  authLogout,
  authRegister,
} from "../../controllers/auth.controllers.js";
import {
  validatorLogin,
  validatorRegister,
} from "../../validators/auth.validators.js";
import { checkSession } from "../../middleware/session.middleware.js";

const authRouter = Router();
//const loginRouter = express.Router();

authRouter
  .post("/register", validatorRegister, authRegister)

  .post("/login", validatorLogin, authLogin)

  .post("/logout", checkSession, authLogout);

export { authRouter };
