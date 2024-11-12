// types.ts
export type PaymentMethodEnum = '계좌이체' | '카드결제' | '숨고페이' | '현금결제';
export type ReceiptTypeEnum =
  | '간이영수증'
  | '세금계산서'
  | '현금영수증'
  | '카드영수증'
  | '필요없음';

// 기본 고객 정보 타입
export interface Customer {
  customerId?: number;
  customerName: string;
  phoneNumber: string;
  location: string;
  bookingDate: Date;
  orderTimeId: number;
  remark?: string;
}

// 주문 결제 정보 타입
export interface OrderPayment {
  orderPayId?: number;
  customerId?: number;
  totalAmount: number;
  depositAmount: number;
  depositMethodTypeId: number;
  depositReceiptId?: number;
  receiptIssued: boolean;
}

// 폼 입력값을 위한 통합 타입
export interface CustomerFormValues {
  customerId?: number;
  reservationDateTime: Date | null;
  name: string;
  phoneNumber: string;
  address: string;
  remark: string;
  paymentMethod: PaymentMethodEnum;
  receiptType: ReceiptTypeEnum;
  isReceiptIssued: boolean;
  isDepositPaid: boolean;
  depositAmount: number;
}

// API 요청 타입
export interface CustomerRegistrationRequest {
  customerName: string;
  phoneNumber: string;
  location: string;
  bookingDate: string;
  orderTimeId: number;
  remark?: string;
  paymentInfo: {
    depositAmount: number;
    depositMethodType: PaymentMethodEnum;
    receiptType: ReceiptTypeEnum;
    receiptIssued: boolean;
  };
}

// API 응답 타입
export interface CustomerRegistrationResponse {
  customerId: number;
  orderPayId: number;
  message: string;
}
