import { OrderFormValues } from '@/data/ShaCustomerForm';
import api from '@/utils/axios';

export interface OrderResponse {
  success: boolean;
  orderId?: number;
  message?: string;
}

// API 요청 타입 정의
interface OrderApiRequest {
  order_date: string;
  order_customer_name: string;
  order_customer_phone: string;
  order_customer_addr: string;
  order_customer_remark: string;
  deposit_paid: boolean;
  order_deposit: number;
  order_payment: string;
  order_receipt_docs: string;
  receipt_docs_issued: boolean;
  order_category: string;
  order_product: string;
  order_remark: string;
  order_count: number;
  order_total_amount: number;
  order_isDiscount: boolean;
  order_discount_ratio: number;
  order_engineer_name: string;
}

// FormValues를 API 요청 형식으로 변환하는 함수
const transformToApiRequest = (data: OrderFormValues): OrderApiRequest => {
  const {
    // 제외할 필드들
    totalAmount,
    selectedEngineerId,
    engineerInfo,
    availableEngineers,
    orderCustomerPhone,
    ...rest
  } = data;

  return {
    order_date: rest.orderDate,
    order_customer_name: rest.orderCustomerName,
    order_customer_phone: orderCustomerPhone.replace(/-/g, ''),
    order_customer_addr: rest.orderCustomerAddr,
    order_customer_remark: rest.orderCustomerRemark,
    deposit_paid: rest.depositPaid,
    order_deposit: rest.orderDeposit,
    order_payment: rest.orderPayment,
    order_receipt_docs: rest.orderReceiptDocs,
    receipt_docs_issued: rest.receiptDocsIssued,
    order_category: rest.orderCategory,
    order_product: rest.orderProduct,
    order_remark: rest.orderRemark || '',
    order_count: rest.orderCount,
    order_total_amount: rest.orderTotalAmount,
    order_isDiscount: rest.orderIsDiscount,
    order_discount_ratio: rest.orderDiscountRatio,
    order_engineer_name: rest.orderEngineerName,
  };
};

const orderApi = {
  register: async (data: OrderFormValues): Promise<OrderResponse> => {
    const apiRequest = transformToApiRequest(data);
    const response = await api.post<OrderResponse>('/order-management/orders', apiRequest);
    return response.data;
  },

  modify: async (id: number, data: OrderFormValues): Promise<OrderResponse> => {
    const apiRequest = transformToApiRequest(data);
    const response = await api.patch<OrderResponse>(`/order-management/orders/${id}`, apiRequest);
    return response.data;
  },
};

export default orderApi;
