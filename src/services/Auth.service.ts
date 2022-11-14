import axios from "axios";
import jwt_decode from "jwt-decode";

import authHeader from "../utils/authHeader";
import { API_URL, HEADERS } from "./global";

export type RegisterInput = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginInput = {
  email: string;
  password: string;
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

type UserResult = {
  _id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

export const login = (payload: LoginInput) => {
  return axios
    .post(`${API_URL}/sessions`, payload, {
      headers: HEADERS,
    })
    .then((res) => {
      const { accessToken, refreshToken } = res.data;

      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
      }

      return res.data;
    });
};

export const register = (payload: RegisterInput) => {
  return axios
    .post<UserResult>(`${API_URL}/users`, payload, {
      headers: HEADERS,
    })
    .then((res) => {
      const { accessToken, refreshToken } = res.data;

      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
      }

      return res.data;
    });
};

export const logout = () => {
  return axios
    .delete(`${API_URL}/sessions`, {
      headers: { ...HEADERS, ...authHeader() },
    })
    .then(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    });
};

export const getCurrentUser = (): UserDocument | null => {
  const user = localStorage.getItem("access_token");
  if (user) {
    return {
      ...jwt_decode(user)!,
      accessToken: localStorage.getItem("access_token")!,
      refreshToken: localStorage.getItem("refresh_token")!,
    };
  }
  return null;
};
