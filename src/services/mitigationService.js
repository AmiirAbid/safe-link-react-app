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

export const mitigationService = {
  mitigateAlert: async (id, action) => {
    try {
      const { data } = await api.patch(`/alerts/${id}/mitigate`, { action });
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
