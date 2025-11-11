import { useUserStore } from "../stores/userStore";
export const useAuth = () => {
  const user = useCookie<any>("user");
  const API_URL = "http://localhost:3001";

  const signup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response: any = await $fetch(`${API_URL}/users`, {
      method: "POST",
      body: data,
    });
    user.value = response;
    console.log(response);
  };

  const login = async (data: { email: string; password: string }) => {
    const response: any = await $fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: data,
    });
    user.value = response.user;
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    signup,
    login,
    logout,
  };
};
