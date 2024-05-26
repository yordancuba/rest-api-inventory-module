export interface Auth extends LoginAuth {
  name: string;
}

export interface LoginAuth {
  email: string;
  password: string;
}
