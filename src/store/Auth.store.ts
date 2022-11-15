import axios from "axios";
import jwt_decode from "jwt-decode";

import { API_URL, HEADERS } from "../utils/global";

import { observable, action, computed } from "mobx";

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
  role: string;
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

export class AuthStore {
  @observable
  user: UserDocument | null = this.userData;

  @action
  async login(payload: LoginInput) {
    return axios
      .post(`${API_URL}/sessions`, payload, {
        headers: HEADERS,
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;

        if (accessToken && refreshToken) {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);

          this.user = this.userData;
        }

        return res.data;
      });
  }

  @action
  async register(payload: RegisterInput) {
    return axios
      .post<UserResult>(`${API_URL}/users`, payload, {
        headers: HEADERS,
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;

        if (accessToken && refreshToken) {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);

          this.user = this.userData;
        }

        return res.data;
      });
  }

  @action
  async logout() {
    try {
      axios.delete(`${API_URL}/sessions`, {
        headers: { ...this.authHeader, ...HEADERS },
      });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    this.user = null;
  }

  @computed
  get userData(): UserDocument | null {
    const accessToken = localStorage.getItem("access_token")!;
    if (accessToken) {
      return {
        ...jwt_decode(accessToken)!,
        accessToken: localStorage.getItem("access_token")!,
        refreshToken: localStorage.getItem("refresh_token")!,
      };
    }
    return null;
  }

  @computed
  get authHeader() {
    return {
      Authorization: `Bearer ${this.user?.accessToken}`,
      "x-refresh": `Bearer ${this.user?.refreshToken}`,
    };
  }
}
