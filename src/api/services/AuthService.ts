import { ILoginForm, ILoginResponse, ISignUpForm } from "@models/collections";
import { Endpoints } from "@models/generic";
import { AxiosResponse } from "axios";
import api from "../api";

const login = async (
  data: ILoginForm,
): Promise<AxiosResponse<ILoginResponse>> => {
  const response = await api.post(Endpoints.AuthLogin, data);

  return response;
};
const signUp = async (
  data: ISignUpForm,
  code: string,
): Promise<AxiosResponse<ILoginResponse>> => {
  const { confirmPassword, ...signUpData } = data;
  const response = await api.post(Endpoints.AuthSignUp, {
    ...signUpData,
    code,
  });

  return response;
};
const recover = async (email: string) => {};

const me = async () => {
  const response = await api.get(Endpoints.AuthMe);

  return response;
};

const validateInviteCode = async (code: string) => {
  const response = await api.post(Endpoints.AuthValidateInviteCode, { code });

  return response;
};

export default {
  login,
  signUp,
  recover,
  me,
  validateInviteCode,
};
