import { OrderFormValues } from '@/data/ShaCustomerForm';
import api from '@/utils/axios';

export interface OrderResponse {
  success: boolean;
  orderId?: number;
  message?: string;
}

interface OrderRequestBody {
  order_date: string;
  order_customer_name: string;
  order_customer_phone: string;
  order_customer_addr: string;
  order_customer_remark: string;
  deposit_payed: boolean;
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

const transformFormToRequestData = (data: OrderFormValues): OrderRequestBody => {
  return {
    order_date: data.orderDate,
    order_customer_name: data.orderCustomerName,
    order_customer_phone: data.orderCustomerPhone,
    order_customer_addr: data.orderCustomerAddr,
    order_customer_remark: data.orderCustomerRemark,
    deposit_payed: data.depositPayed,
    order_deposit: data.orderDeposit,
    order_payment: data.orderPayment,
    order_receipt_docs: data.orderReceiptDocs,
    receipt_docs_issued: data.receiptDocsIssued,
    order_category: data.orderCategory,
    order_product: data.orderProduct,
    order_remark: data.orderRemark || '',
    order_count: data.orderCount,
    order_total_amount: data.orderTotalAmount,
    order_isDiscount: data.orderIsDiscount,
    order_discount_ratio: data.orderDiscountRatio,
    order_engineer_name: data.orderEngineerName,
  };
};

export const orderApi = {
  register: async (data: OrderFormValues): Promise<OrderResponse> => {
    try {
      // 데이터 유효성 검사
      if (!data.orderDate) throw new Error('예약일시는 필수입니다.');
      if (!data.orderCustomerName) throw new Error('고객성함은 필수입니다.');
      if (!data.orderCustomerPhone) throw new Error('연락처는 필수입니다.');
      if (!data.orderCustomerAddr) throw new Error('방문주소는 필수입니다.');
      if (!data.orderProduct) throw new Error('세척품목은 필수입니다.');
      if (data.orderTotalAmount <= 0) throw new Error('세척금액을 입력해주세요.');

      // 전화번호 형식 정리 (하이픈 제거)
      const cleanedData = {
        ...data,
        orderCustomerPhone: data.orderCustomerPhone.replace(/-/g, ''),
      };

      // API 요청 형식으로 변환
      const requestData = transformFormToRequestData(cleanedData);

      const response = await api.post<OrderResponse>('/order-info/createNewOrder', requestData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data.message || '주문 등록에 실패했습니다.',
        };
      }
      return {
        success: false,
        message: error.message || '주문 등록 중 오류가 발생했습니다.',
      };
    }
  },
};

export default orderApi;
