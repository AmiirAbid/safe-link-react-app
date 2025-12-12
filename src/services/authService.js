import {api} from "@/services/api.js";

export const authService = {
  login: async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message || error.message || "Login failed";
      throw new Error(message);
    }
  },

  signup: async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/signup", { name, email, password });
      
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      const message =
        error.response?.data?.message || error.message || "Signup failed";
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
