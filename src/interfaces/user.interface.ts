export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}

export interface AuthUser {
  name: string;
  email: string;
  password: string;
}

export interface UserJwtPaload {
  name: string;
  email: string;
  role: string | null;
  iat: number;
  exp: number;
}
