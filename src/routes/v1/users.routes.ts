import { Request, Response, Router } from "express";
import {
  changeRole,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/user.controllers";
import { checkSession } from "../../middleware/session.middleware";
import { isAdmin } from "../../middleware/isAdmin.middleware";

const userRouter = Router();

/**
 * All Category Routes
 */
userRouter
  .get("/", checkSession, isAdmin, getUsers)

  .get("/:id", getUser)

  .put("/:id", updateUser)

  .delete("/:id", deleteUser)

  .put("/changerole/:id", changeRole);

export { userRouter };
