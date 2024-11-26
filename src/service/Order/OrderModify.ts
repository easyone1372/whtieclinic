// services/api/customer.ts
import { Customer } from '@/components/organism/Customer/OrderModify';
import api from '@/utils/axios';

export interface CustomerResponse {
  success: boolean;
  orderId?: number;
  message?: string;
}

// API 응답 타입 (스네이크 케이스)
interface CustomerApiResponse {
  order_date: string;
  customer_name: string;
  customer_phone: string;
  customer_addr: string;
  customer_remark: string | null;
  engineer_name: string;
  order_product: string;
  order_payment: string;
  order_receipt_docs: string;
  receipt_docs_issued: boolean | null;
}

// API 응답을 프론트엔드 타입으로 변환하는 함수
const transformApiResponse = (data: CustomerApiResponse): Customer => ({
  orderDate: data.order_date,
  customerName: data.customer_name,
  customerPhone: data.customer_phone,
  customerAddr: data.customer_addr,
  customerRemark: data.customer_remark,
  engineerName: data.engineer_name,
  orderProduct: data.order_product,
  orderPayment: data.order_payment,
  orderReceiptDocs: data.order_receipt_docs,
  receiptDocsIssued: data.receipt_docs_issued,
});

export const customerApi = {
  // 모든 주문 정보 조회
  getAllOrders: async (): Promise<Customer[]> => {
    try {
      const response = await api.get<CustomerApiResponse[]>('/order-management/orders');
      return response.data.map(transformApiResponse);
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // 특정 날짜의 주문 정보 조회
  getOrdersByDate: async (date: string): Promise<Customer[]> => {
    try {
      const response = await api.get<CustomerApiResponse[]>('/order-management/orders', {
        params: { date },
      });
      return response.data.map(transformApiResponse);
    } catch (error) {
      console.error('Error fetching orders by date:', error);
      throw error;
    }
  },
};
