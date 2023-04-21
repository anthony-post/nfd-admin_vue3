import { loginAPIInstance } from "@/api";
import { entityAPIInstance } from "@/api";
import { refreshAPIInstance } from "@/api";

export const authAPI = {
  login(data = {}) {
    const url = "/auth/login";
    return loginAPIInstance.post(url, data);
  },
  refresh(data = {}) {
    const url = "/auth/refresh";
    return refreshAPIInstance.post(url, data);
  },
  logout() {
    const url = "/auth/logout";
    return entityAPIInstance.post(url);
  },
};
