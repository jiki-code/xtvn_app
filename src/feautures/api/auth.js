import { apiRequest } from "@/helpers/apiRequest";

const reqLogin = async (payload) => {
  try {
    const res = await apiRequest("/auth/login", {
      method: "POST",
      body: payload,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export {reqLogin }