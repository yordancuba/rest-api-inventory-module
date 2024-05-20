import { Auth, LoginAuth } from "../interfaces/auth.interface.js";
import { passwordHash, verifyHashedPassword } from "../utils/bcrypt.handle.js";
import { validateDataError } from "../utils/error.handle.js";
import { generateToken } from "../utils/jwt.handle.js";
import { prisma } from "../utils/prisma.client.js";

/**
 *
 * @param param0 Params data from new User
 * @returns new User if all data is correct or null if not
 */
const registerNewUser = async ({ name, email, password }: Auth) => {
  try {
    if (!name || !email || !password)
      validateDataError("NAME_EMAIL_PASSWORD_ARE_REQUIRED");

    const passworHashed = await passwordHash(password);

    const userToRegister = await prisma.user.create({
      data: {
        name,
        email,
        password: passworHashed,
      },
    });
    return { status: "OK", errorMessage: null, data: userToRegister };
  } catch (e) {
    return { status: "ERROR", errorMessage: `ERROR_REGISTERING`, data: null };
  }
};

const loginUser = async (email: string, password: string) => {
  if (!email || !password || email === "" || password === "")
    return validateDataError("EMAIL_AND_PASS_ARE_REQUIRED");
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) return validateDataError("USER_OR_PASSWORD_WRONG");

    const passwordToCompare = await verifyHashedPassword(
      password,
      foundUser.password
    );

    if (!passwordToCompare) return validateDataError("USER_OR_PASSWORD_WRONG");

    const token = generateToken({
      email: foundUser.email,
      role: foundUser.role,
    });

    return {
      status: "OK",
      errorMessage: null,
      data: { name: foundUser.name, email: foundUser.email, token },
    };
  } catch (error) {
    return validateDataError("ERROR_LOGIN");
  }
};

export { registerNewUser, loginUser };
