export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}