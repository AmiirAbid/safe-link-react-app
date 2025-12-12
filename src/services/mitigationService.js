import {api} from "@/services/api.js";

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
