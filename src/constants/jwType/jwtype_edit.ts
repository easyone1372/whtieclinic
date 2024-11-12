// types/schedule-edit.ts
import { productCategories } from '@/constants/productCategory';



// 제품 카테고리 키 타입
type ProductCategoryKey = keyof typeof productCategories;

// 기본 정보 타입
export type EditOrderInfo = {
  selectTime: Date | null;
  engineer_id: number | null;
  customer_id: number | null;
  order_id: number | null;
};

// 엔지니어 시간 폼 타입
export type EngineerTimeFormValues = {
  booking_date: Date;
  engineer_id: number | null;
  name: string;
  order_time_id: number | null;
};

// 고객 정보 폼 타입
export type CustomerFormValues = {
  customer_id: number;
  customer_name: string;
  phone_number: string;
  location: string;
  booking_date?: Date;
  order_time_id?: number;
  remark?: string;
  receipt_docs_id?: number;
  payment_method_type_id?: number;
  receipt_issued?: boolean;
};

// 주문 정보 폼 타입
export type OrderFormValues = {
  order_id: number;
  product_detail_id: number;
  product_type_id: number;
  product_remark?: string;
  count: number;
  discount_amount: number;
  total_amount: number;
  remark?: string;
  // UI용 추가 필드
  selectedCategory: ProductCategoryKey | '';
  selectedDropdownValue: string;
  isDiscountApplied: boolean;
};

// 결제 정보 폼 타입
export type PaymentFormValues = {
  order_pay_id: number;
  customer_id: number;
  total_amount: number;
  deposit_amount: number;
  balance_amount: number;
  discount_amount: number;
  deposit_method_type_id: number;
  balance_method_type_id: number;
  deposit_receipt_id?: number;
  balance_receipt_id?: number;
  receipt_issued: boolean;
};

// API 응답 타입들
export type PaymentMethodType = {
  payment_method_type_id: number;
  name: '계좌이체' | '카드결제' | '숨고페이' | '현금결제';
};

export type ReceiptDocsType = {
  receipt_docs_id: number;
  receipt_type_enum: '간이영수증' | '세금계산서' | '현금영수증' | '카드영수증' | '필요없음';
};

export type OrderTimeType = {
  order_time_id: number;
  time: string;
};

export type ProductType = {
  product_type_id: number;
  product: string;
};

export type ProductDetail = {
  product_detail_id: number;
  product_type_id: number;
  name: string;
};

// Props 타입들
export type FormFieldType = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'time' | 'checkbox';
  required?: boolean;
  options?: { label: string; value: string | number }[];
};

// 엔지니어 관련 타입
export type UnifiedEngineer = {
  engineerId: number;
  engineerName: string;
  phoneNumber?: string;
  residenceArea?: string;
  Items?: string[];
  ItemsSpecialNotes?: string;
  allowanceRate?: string;
  paymentDay?: string;
  holidayRegistration?: Date[];
  regularHoliday?: string[];
};

// 주문 관련 타입
export type SimplifiedOrder = {
  orderId: number;
  engineerId: number;
  startTime: Date;
  endTime: Date;
  customerId: number;
  customerName?: string;
  address?: string;
  phoneNumber?: string;
  product?: string;
  itemCount?: number;
  finalPrice?: number;
  specialNotes?: string;
  orderUniqueDetails?: string;
};

// 화면 표시용 스케줄 타입
export type ScheduleDisplayOrder = {
  OrderId: number;
  EngineerId: number;
  StartTime: Date;
  EndTime: Date;
  CustomerName: string;
  Address: string;
  PhoneNumber: string;
  ProductType: string;
  ProductCount: number;
  Price: number;
  Remarks: string;
  CustomerId: number;
  Product: string;
  ItemCount: number;
  FinalPrice: number;
  CustomerUniqueDetails: string;
};