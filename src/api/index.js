import axios from "axios";

const basicToken = process.env.VUE_APP_BASE_ADMIN_TOKEN;

// const loggedInUser = localStorage.getItem("user");

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
    // Authorization: `Bearer ${loggedInUser.access_token}`,
    Authorization: "Bearer 1867956241b02436c009392ea318f6c832d59212",
  },
};

export const entityAPIInstance = axios.create(instanceConfig);
