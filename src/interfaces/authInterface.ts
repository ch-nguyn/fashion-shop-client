export interface Signup {
  name: string;
  email: string;
  phoneNumber: string;
  role?: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdatePassword {
  oldPassword?: string;
  password: string;
  passwordConfirm: string;
}

export interface ILogin {
  email: string;
  password: string;
}
