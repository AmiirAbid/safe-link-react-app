import {api} from "@/services/api.js";

export const logService = {
  getLogs: async (params = {}) => {
    try {
      const { data } = await api.get("/logs", { params });
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
