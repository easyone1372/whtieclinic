import { EngineerSkill } from '../yh/EngineerTypeData';

// 기사 관련 타입
export type Engineer = {
  engineer_id: number;
  name: string;
  phone_number: string;
  location: string;
  remark?: string;
  skills: EngineerSkill[];
  dayoffs: Dayoff[]; // 정규 휴무
  holidays: Holiday[]; // 비정규 휴무
};

// 휴무 관련 타입
export type Dayoff = {
  engineer_id: number;
  weekday_id: number;
};

export type Holiday = {
  holiday_id: number;
  engineer_id: number;
  holiday: Date;
};

// 주문 관련 타입
export type Order = {
  order_id: number;
  customer_id: number;
  product_detail_id: number;
  product_remark?: string;
  count: number;
  discount_amount: number;
  total_amount: number;
  remark?: string;
};

// 스케줄 관련 타입
export type EngineerCustomer = {
  engineer_customer_id: number;
  engineer_id: number;
  customer_id: number;
  order_pay_id: number;
};

export type EngineerCustomerTime = {
  engineer_customer_time_id: number;
  engineer_customer_id: number;
  order_time_id: number;
};

export type OrderTime = {
  order_time_id: number;
  time: string;
};

// 고객 정보 타입
export type Customer = {
  customer_id: number;
  customer_name: string;
  phone_number: string;
  location: string;
  booking_date: Date;
  order_time_id: number;
  remark?: string;
};

// 화면 표시용 통합 타입
export type ScheduleDisplayOrder = {
  OrderId: number;
  EngineerId: number;
  StartTime: Date;
  EndTime: Date;
  CustomerName: string;
  Address: string;
  PhoneNumber: string;
  ProductType: string; // 제품 종류
  ProductCount: number; // 제품 수량
  Price: number; // 가격
  Remarks: string; // 특이사항
  CustomerId: number; // 고객 ID
  Product: string; // 제품 이름 또는 유형 (예시로 추가한 필드)
  ItemCount: number; // 아이템 수 (ProductCount와 동일, 명확히 표현)
  FinalPrice: number; // 최종 가격
  CustomerUniqueDetails: string; // 고객 특이사항
};

