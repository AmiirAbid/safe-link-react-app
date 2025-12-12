import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter le token automatiquement si existant
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const alertService = {
  getAlerts: async (params = {}) => {
    try {
      const { data } = await api.get("/alerts", { params });
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getAlert: async (id) => {
    try {
      const { data } = await api.get(`/alerts/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteAlert: async (id) => {
    try {
      const { data } = await api.delete(`/alerts/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
