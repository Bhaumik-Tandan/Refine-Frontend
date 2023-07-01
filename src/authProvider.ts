import { AuthBindings } from "@refinedev/core";
import apiHelper from "utility/apiHelper";

export const TOKEN_EXPIRES = "token_expires";

export const authProvider: AuthBindings = {
  login: async (data) => {
    const response  = await apiHelper("post", "/auth/login", data);

    if(response.status === 200){
      const { data:{expires} } = response;
      localStorage.setItem(TOKEN_EXPIRES, expires);
      return {
        success: true,
      };
    }

    return {
      success: false,
    };

},
  logout: async () => {
     await apiHelper("get", "/auth/logout",{});
    localStorage.removeItem(TOKEN_EXPIRES);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const expires = localStorage.getItem(TOKEN_EXPIRES);
    if (expires && new Date(expires) > new Date()) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  forgotPassword: async (data) => {
    const response = await apiHelper("post", "/auth/forgot-password", data);
    if (response.status.toString().startsWith("2")) {
      const { data } = response;
      return {
        success: true,
        redirectTo: `/login`,
      };
    }
    return {
      success: false,
    };
  },
  getPermissions: async () => Promise.resolve(),
  getIdentity: async () => {
    return Promise.resolve();
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};