import { OrderFormValues } from '@/data/ShaCustomerForm';
import api from '@/utils/axios';

export interface OrderResponse {
  success: boolean;
  orderId?: number;
  message?: string;
}

const orderApi = {
  register: async (data: OrderFormValues): Promise<OrderResponse> => {
    const cleanedData = {
      ...data,
      orderCustomerPhone: data.orderCustomerPhone.replace(/-/g, ''),
    };

    const response = await api.post<OrderResponse>('/order-info/createNewOrder', cleanedData);
    return response.data;
  },

  modify: async (id: number, data: OrderFormValues): Promise<OrderResponse> => {
    const cleanedData = {
      ...data,
      orderCustomerPhone: data.orderCustomerPhone.replace(/-/g, ''),
    };

    const response = await api.patch<OrderResponse>(`/order-management/orders/${id}`, cleanedData);
    return response.data;
  },
};

export default orderApi;
