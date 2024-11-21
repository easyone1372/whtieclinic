// services/api/engineer.ts
import { EngineerFormValues } from '@/data/ShaEngineerFormData';
import api from '@/utils/axios';

export interface EngineerResponse {
  success: boolean;
  engineerId?: number;
  message?: string;
}

export const engineerApi = {
  register: async (data: EngineerFormValues): Promise<EngineerResponse> => {
    const response = await api.post<EngineerResponse>('/engineer/createEngineer', data);
    return response.data;
  },
};
