// services/api/customer.ts
import { CustomerFormValues } from '@/data/ShaCustomerFormData';
import api from '@/utils/axios';

export interface CustomerResponse {
  success: boolean;
  customerId?: number;
  message?: string;
}

export const customerApi = {
  register: async (data: CustomerFormValues): Promise<CustomerResponse> => {
    const response = await api.post<CustomerResponse>('/customer', data);
    return response.data;
  },
};
