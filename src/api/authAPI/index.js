import { loginAPIInstance } from "@/api";

export const authAPI = {
  login(data = {}) {
    const url = "/auth/login";
    return loginAPIInstance.post(url, data);
  },
};
