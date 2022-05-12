import axios from "axios";

const basicToken = process.env.VUE_APP_BASE_ADMIN_TOKEN;

const loginConfig = {
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': basicToken
    }
}

export const loginAPIInstance = axios.create(loginConfig);
