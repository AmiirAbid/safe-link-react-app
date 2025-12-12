import {api} from "@/services/api.js";

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
