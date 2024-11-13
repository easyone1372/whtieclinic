// services/api/order.ts
import { OrderFormValues } from '@/data/ShaOrderFormData';
import api from '@/utils/axios';

export interface OrderResponse {
  success: boolean;
  orderId?: number;
  message?: string;
}

export const orderApi = {
  register: async (data: OrderFormValues): Promise<OrderResponse> => {
    const response = await api.post<OrderResponse>('/order', data);
    return response.data;
  },
};
