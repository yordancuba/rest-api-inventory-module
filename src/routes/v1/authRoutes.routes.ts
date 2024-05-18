import { Router } from "express";
import { authLogin, authRegister } from "../../controllers/auth.controllers";
import { checkSession } from "../../middleware/session.middleware";

const authRouter = Router();
//const loginRouter = express.Router();

authRouter
  .post("/register", authRegister)

  .post("/login", authLogin);

export { authRouter };
