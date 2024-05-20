import { Router } from "express";
import { authLogin, authRegister } from "../../controllers/auth.controllers.js";

const authRouter = Router();
//const loginRouter = express.Router();

authRouter
  .post("/register", authRegister)

  .post("/login", authLogin);

export { authRouter };
