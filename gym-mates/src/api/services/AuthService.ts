import { Endpoints } from "@models/generic";
import api from "../api";
import { ILoginForm, ILoginResponse, ISignUpForm } from "@models/collections";
import { AxiosResponse } from "axios";

const login = async (
  data: ILoginForm
): Promise<AxiosResponse<ILoginResponse>> => {
  const response = await api.post(Endpoints.AuthLogin, data);

  return response;
};
const signUp = async (
  data: ISignUpForm
): Promise<AxiosResponse<ILoginResponse>> => {
  const { confirmPassword, ...signUpData } = data;
  const response = await api.post(Endpoints.AuthSignUp, signUpData);

  return response;
};
const recover = async (email: string) => {};

const me = async () => {
  const response = await api.get(Endpoints.AuthMe);

  return response;
};

export default {
  login,
  signUp,
  recover,
  me,
};
