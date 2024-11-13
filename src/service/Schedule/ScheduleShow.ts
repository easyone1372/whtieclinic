import { SchShowDisplay } from '@/constants/LJW/ShowSchTypes';
import api from '@/utils/axios';

export interface ScheduleShowResponse {
  success: boolean;
  customerId?: number;
  orderId?: number;
  engineerid?: number;
  message?: string;
  data?: any;
}

export const ScheduleShowApi = {
  schshow: async (params: {
    engineerId: number;
    selectedDate: string;
  }): Promise<ScheduleShowResponse> => {
    const response = await api.get<ScheduleShowResponse>('/schdule/show', { params });
    return response.data;
  },
};
