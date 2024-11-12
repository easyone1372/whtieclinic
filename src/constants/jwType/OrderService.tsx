import api from '@/utils/axios';
import {
  CustomerFormValues,
  EngineerTimeFormValues,
  OrderFormValues,
  PaymentFormValues,
  PaymentMethodType,
  ProductDetail,
  ProductType,
  ReceiptDocsType,
} from './jwtype_edit';

// API 요청 데이터 타입
type OrderUpdateData = {
  engineerTime: EngineerTimeFormValues;
  customer: CustomerFormValues;
  order: OrderFormValues;
  payment: PaymentFormValues;
};

// 결제 방식 조회
export const fetchPaymentMethods = async (): Promise<PaymentMethodType[]> => {
  const response = await api.get<PaymentMethodType[]>('/payment-methods');
  return response.data;
};

// 증빙서류 타입 조회
export const fetchReceiptTypes = async (): Promise<ReceiptDocsType[]> => {
  const response = await api.get<ReceiptDocsType[]>('/receipt-types');
  return response.data;
};

// 제품 타입 조회
export const fetchProductTypes = async (): Promise<ProductType[]> => {
  const response = await api.get<ProductType[]>('/product-types');
  return response.data;
};

// 제품 상세 조회
export const fetchProductDetails = async (productTypeId: number): Promise<ProductDetail[]> => {
  const response = await api.get<ProductDetail[]>(`/product-details`, {
    params: { productTypeId },
  });
  return response.data;
};

// 기사 목록 조회
export const fetchAvailableEngineers = async (date: Date): Promise<any[]> => {
  const response = await api.get('/engineers/available', {
    params: { date: date.toISOString() },
  });
  return response.data;
};

// 주문 상세 조회
export const fetchOrderDetails = async (orderId: number) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// 주문 수정
export const updateOrder = async (orderId: number, data: OrderUpdateData) => {
  const response = await api.put(`/orders/${orderId}`, data);
  return response.data;
};
