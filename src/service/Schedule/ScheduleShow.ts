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
    const response = await api.get<ScheduleShowResponse>('/api/engineer/getAllEngineerSchedule', {
      params,
    });
    return response.data;
  },
};

export const fetchSchedule = async (): Promise<SchShowDisplay> => {
  try {
    const response = await api.get('/api/engineer/getAllEngineerSchedule');
    return response.data;
  } catch (error) {
    console.error('Error fetching engineers:', error);
    throw error;
  }
};
