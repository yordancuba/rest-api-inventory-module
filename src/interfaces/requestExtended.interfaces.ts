import { Request } from "express";

/* interface RequestExt extends Request {
  userSession?: Object;
} */

interface RequestExt extends Request {
  userSession?: {
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  };
}

export { RequestExt };
