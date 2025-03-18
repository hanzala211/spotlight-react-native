import { sendRequest } from "@helpers";

export const authServices = {
  signup: (data: unknown) => sendRequest({
    url: "/auth/signup",
    isAuthIncluded: false,
    data,
    method: "POST"
  }),
  login: (data: unknown) => sendRequest({
    url: "/auth/login",
    isAuthIncluded: false,
    data,
    method: "POST"
  }),
  me: () => sendRequest({
    url: "/auth/me",
    isAuthIncluded: true,
    method: "GET"
  }),
}