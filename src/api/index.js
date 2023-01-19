import axios from "axios";
import { authAPI } from "@/api/authAPI";

const basicToken = process.env.VUE_APP_BASE_ADMIN_TOKEN;

const loginConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: basicToken,
  },
};

export const loginAPIInstance = axios.create(loginConfig);

const refreshTokenConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_APPLICATION_ID,
    "Content-Type": "application/json",
    Authorization: basicToken,
  },
};

export const refreshAPIInstance = axios.create(refreshTokenConfig)

const instanceConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_APPLICATION_ID,
    "Content-Type": "application/json",
  },
};

const ApiInstance = axios.create(instanceConfig);

ApiInstance.interceptors.request.use((config) => {
  const tokenType = localStorage.getItem("token_type");
  const authType = tokenType[1].toUpperCase() + tokenType.slice(2, 7);
  const accessToken = localStorage.getItem("access_token");
  config.headers.authorization = `${authType} ${accessToken}`.replace(
    /['"]+/g,
    ""
  );
  return config;
});

ApiInstance.interceptors.response.use(undefined, async function (error) {
  //save original request data
  const originalRequest = error.config;
  //check for valid token
  if (error.response && error.response.status === 401) {
    //get refresh token from Local Storage
    const refreshToken = localStorage.getItem("refresh_token");
    //send refresh token request
    const { data: userData } = await authAPI.refresh({
      refresh_token: refreshToken.replace(
        /['"]+/g,
        "")
    });
    //write in LocalStorage new valid token
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem(
      "access_token",
      JSON.stringify(userData.access_token)
    );
    localStorage.setItem(
      "refresh_token",
      JSON.stringify(userData.refresh_token)
    );
    localStorage.setItem("token_type", JSON.stringify(userData.token_type));
    //send again original request
    return entityAPIInstance(originalRequest);
  }
  return Promise.reject(error)
});

export const entityAPIInstance = ApiInstance;
