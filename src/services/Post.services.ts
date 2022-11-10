import axios from "axios";
import authHeader from "../utils/authHeader";
import { API_URL, HEADERS } from "./global";

export const getAllPosts = () => {
  return axios.get(`${API_URL}/posts`, {
    headers: { ...authHeader(), ...HEADERS },
  });
};

export const getOnePost = (postId: string) => {
  return axios.get(`${API_URL}/post/${postId}`, { headers: authHeader() });
};
