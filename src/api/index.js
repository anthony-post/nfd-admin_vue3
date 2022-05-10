import axios from "axios";

const basicToken = 'Basic YTFiMmMzZjo0Y2JjZWE5NmRl';

const loginConfig = {
    baseURL: 'https://api-factory.simbirsoft1.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': basicToken
    }
}

export const loginAPIInstance = axios.create(loginConfig);
