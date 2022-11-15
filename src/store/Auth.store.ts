import axios from "axios";
import jwt_decode from "jwt-decode";

import { API_URL, HEADERS } from "../utils/global";

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

type AuthStoreType = {
  user: UserDocument | null;
  login: (payload: LoginInput) => Promise<any>;
  register: (payload: RegisterInput) => Promise<any>;
  logout: () => void;
  getAuthHeader: () => object;
  getUserData: () => void;
};

export const createAuthStore = (): AuthStoreType => {
  return {
    user: null,
    login(payload: LoginInput) {
      return axios
        .post(`${API_URL}/sessions`, payload, {
          headers: HEADERS,
        })
        .then((res) => {
          const { accessToken, refreshToken } = res.data;

          if (accessToken && refreshToken) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);

            this.getUserData();
          }

          return res.data;
        });
    },
    register(payload: RegisterInput) {
      return axios
        .post<UserResult>(`${API_URL}/users`, payload, {
          headers: HEADERS,
        })
        .then((res) => {
          const { accessToken, refreshToken } = res.data;

          if (accessToken && refreshToken) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);

            this.getUserData();
          }

          return res.data;
        });
    },
    async logout() {
      try {
        axios.delete(`${API_URL}/sessions`, {
          headers: { ...this.getAuthHeader(), ...HEADERS },
        });
      } catch (e) {
        console.error(e);
      }
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      this.user = null;
    },
    getUserData() {
      const accessToken = localStorage.getItem("access_token")!;
      if (accessToken) {
        this.user = {
          ...jwt_decode(accessToken)!,
          accessToken: localStorage.getItem("access_token")!,
          refreshToken: localStorage.getItem("refresh_token")!,
        };
      }
    },
    getAuthHeader() {
      return {
        Authorization: `Bearer ${this.user?.accessToken}`,
        "x-refresh": `Bearer ${this.user?.refreshToken}`,
      };
    },
  };
};
