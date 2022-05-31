import axios from "axios";

const basicToken = process.env.VUE_APP_BASE_ADMIN_TOKEN;

// const loggedInUser = localStorage.getItem("user");
// const tokenType = localStorage.getItem("token_type");;
// const authType = tokenType[1].toUpperCase() + tokenType.slice(2, 7);
const authType = "Bearer";
const accessToken = localStorage.getItem("access_token");

const loginConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: basicToken,
  },
};

export const loginAPIInstance = axios.create(loginConfig);

const instanceConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_APPLICATION_ID,
    "Content-Type": "application/json",
    Authorization: `${authType} ${accessToken}`.replace(/['"]+/g, ""),
  },
};

export const entityAPIInstance = axios.create(instanceConfig);
