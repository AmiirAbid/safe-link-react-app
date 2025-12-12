import {api} from "@/services/api.js";

export const scanService = {
  startScan: async () => {
    try {
      const { data } = await api.get("/scan"
      );
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
