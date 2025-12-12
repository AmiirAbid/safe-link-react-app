import {api} from "@/services/api.js";

export const alertService = {
  getAlerts: async (params = {}) => {
    try {
      const { data } = await api.get("/alerts?page=1&limit=30", { params });
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
