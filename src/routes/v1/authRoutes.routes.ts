import { Router } from "express";
import { authLogin, authRegister } from "../../controllers/auth.controllers.js";
import {
  validatorLogin,
  validatorRegister,
} from "../../validators/auth.validators.js";

const authRouter = Router();
//const loginRouter = express.Router();

authRouter
  .post("/register", validatorRegister, authRegister)

  .post("/login", validatorLogin, authLogin);

export { authRouter };
