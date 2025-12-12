import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const scanService = {
  startScan: async (target) => {
    try {
      const { data } = await api.post("/scan", { target });
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getScanStatus: async (scanId) => {
    try {
      const { data } = await api.get(`/scan/${scanId}`);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
