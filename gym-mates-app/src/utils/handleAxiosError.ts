import { AxiosError } from "axios";

export const getMessageFromError = (error: AxiosError | Error | unknown) => {
  let message = "An unknown error occurred";

  if (error instanceof Error) {
    message = error.message;
  }
  
  if (error instanceof AxiosError) {
    message = `errors.${error.response?.data?.message}` || error.message;
  }

  return message;
};
