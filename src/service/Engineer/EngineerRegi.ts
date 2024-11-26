import { Engineer, EngineerModifyType } from '@/constants/types/type';
import { EngineerFormValues } from '@/data/ShaEngineerFormData';
import api from '@/utils/axios';

export interface EngineerResponse {
  success: boolean;
  engineerId?: number;
  message?: string;
}

export const engineerApi = {
  register: async (data: EngineerFormValues): Promise<EngineerResponse> => {
    const response = await api.post<EngineerResponse>('/engineer-management/engineers', data);
    return response.data;
  },

  modify: async (id: number, data: EngineerFormValues): Promise<EngineerResponse> => {
    const response = await api.patch<EngineerResponse>(
      `/engineer-management/engineers/${id}`,
      data
    );
    return response.data;
  },

  getEngineer: async (id: number): Promise<EngineerModifyType> => {
    const response = await api.get<Engineer>(`/engineer-management/engineers/${id}`);
    return response.data;
  },
};
