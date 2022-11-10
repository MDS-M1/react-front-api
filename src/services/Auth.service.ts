import axios from "axios";
import jwt_decode from "jwt-decode";

import { API_URL, HEADERS } from "./global";

export type UserInput = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

export type UserDocument = {
  _id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  session: string;
  iat: number;
  exp: number;
};

export const login = (email: string, password: string) => {
  return axios
    .post(
      `${API_URL}/sessions`,
      { email, password },
      {
        headers: HEADERS,
      }
    )
    .then((res) => {
      const { accessToken, refreshToken } = res.data;

      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refreh_token", refreshToken);
      }

      return res.data;
    });
};

export const register = (payload: UserInput) => {
  return axios
    .post(`${API_URL}/users`, payload, {
      headers: HEADERS,
    })
    .then((res) => {
      const { accessToken, refreshToken } = res.data;

      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refreh_token", refreshToken);
      }

      return res.data;
    });
};

export const getCurrentUser = (): UserDocument => {
  return {
    ...(jwt_decode(localStorage.getItem("access_token")!) as UserDocument),
    accessToken: localStorage.getItem("access_token")!,
    refreshToken: localStorage.getItem("refresh_token")!,
  };
};
