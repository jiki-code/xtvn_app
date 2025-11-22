import { apiRequest } from "@/helpers/apiRequest";

const reqLogin = async (payload) => {
  try {
    const res = await apiRequest("/auth/login", {
      method: "POST",
      body: payload,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

const reqLogOut = async () => {
  try {
    const authToken =
      typeof window !== "undefined"
        ? localStorage.getItem("authToken")
        : null;

    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null;

    const res = await apiRequest("/auth/logout", {
      method: "POST",
      token: authToken, 
      body: { refreshToken }, 
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
    }

    return res;
  } catch (error) {
    throw error;
  }
};

export {reqLogin, reqLogOut }