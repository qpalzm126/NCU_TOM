import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `JWT ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
