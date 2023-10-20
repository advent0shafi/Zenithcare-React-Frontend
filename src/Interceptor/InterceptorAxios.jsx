import axiosInstance from "../axiosInstance";
import { store } from "./../redux/Store"; // Import your Redux store and action
import { updatetoken } from "./../redux/AuthContext"; // Import your logout action from
import axios from "axios";

// ... (previous imports)

let isRefreshing = false;
let failedQueue = [];

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalConfig = error.config;
    console.log(originalConfig);

    console.log("Access token soviet union");

    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      const refresh_token = store.getState().auth.refreshToken;
      console.log(refresh_token);
      try {
        const response = await axiosInstance.post(
          "token/refresh/",
          {
            refresh: refresh_token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data["access"]}`;
          const accessTokens = response.data.access;
          const refreshTokens = response.data.refresh;
          store.dispatch(
            updatetoken({
              accessToken: accessTokens,
              refreshToken: refreshTokens,
            })
          );
          console.log("accessToken");
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.log("Failed to refresh token:", refreshError);
      } finally {
        console.log("Failed to refresh token hdsgfhdghgfhs");
        isRefreshing = false;
      }
    }

    // If the token refresh is in progress, queue the failed reques

    return Promise.reject(error);
  }
);
