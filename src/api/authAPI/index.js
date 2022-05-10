import { loginAPIInstance } from "@/api";


export const authAPI = {
    login(data = {}) {
        const url = '/auth/login/oauth';
        return loginAPIInstance.post(url, data);
    }
}
