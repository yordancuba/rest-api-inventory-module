import { Request, Response, Router } from "express";
import {
  changeRole,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/user.controllers.js";
import { checkSession } from "../../middleware/session.middleware.js";
import { isAdmin } from "../../middleware/isAdmin.middleware.js";
import {
  validatorChangeRoleUser,
  validatorDeleteOneUser,
  validatorGetOneUser,
  validatorUpdateOneUser,
} from "../../validators/users.validators.js";

const userRouter = Router();

/**
 * All Category Routes
 */
userRouter
  .get("/", checkSession, isAdmin, getUsers)

  .get("/:id", checkSession, isAdmin, validatorGetOneUser, getUser)

  .put("/:id", checkSession, isAdmin, validatorUpdateOneUser, updateUser)

  .delete("/:id", checkSession, isAdmin, validatorDeleteOneUser, deleteUser)

  .put(
    "/changerole/:id",
    checkSession,
    isAdmin,
    validatorChangeRoleUser,
    changeRole
  );

export { userRouter };
