
import { ApiResponse, Engineer } from '@/constants/yh/EngineerTypeData';
import api from '@/utils/axios';

export const engineerService = {
  getAllEngineers: async () => {
    return api.get<ApiResponse>('engineer-info/getAll');
  },

  updateEngineer: async (engineerId: number, data: Partial<Engineer>) => {
    return api.put(`/engineer-info/${engineerId}`, data);
  },

  updatePaymentStatus: async (engineerId: number, isPaid: boolean) => {
    return api.put(`/engineer-info/${engineerId}/payment-status`, { is_pay: isPaid });
  }
};