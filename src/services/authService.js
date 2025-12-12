import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Crée une instance axios avec l'URL de base
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  login: async (email, password) => {
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      
      // Stocke le token si backend le renvoie
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      // axios error handling
      const message =
        error.response?.data?.message || error.message || "Login failed";
      throw new Error(message);
    }
  },

  signup: async (name, email, password) => {
    try {
      const { data } = await api.post("/api/auth/signup", { name, email, password });
      
      // Stocke le token si backend le renvoie
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
