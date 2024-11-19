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
  schshow: async (params: { engineerId: number; selectedDate: string }): Promise<any> => {
    // 임시로 any 타입 사용
    const response = await api.get('/api/engineer/getAllEngineerSchedule', {
      params,
    });
    console.log('API Response:', response); // 서버 응답 구조 확인
    return response.data; // 필요한 응답 형식에 맞춰 조정
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
