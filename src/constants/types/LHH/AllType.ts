// Enum Types
export type DayNameEnum =
  | '월요일'
  | '화요일'
  | '수요일'
  | '목요일'
  | '금요일'
  | '토요일'
  | '일요일';
export type RateEnum = '50%' | '55%' | '60%' | '65%' | '70%' | '75%' | '80%';
export type PaymentMethodEnum = '계좌이체' | '카드결제' | '숨고페이' | '현금결제';
export type ReceiptTypeEnum =
  | '간이영수증'
  | '세금계산서'
  | '현금영수증'
  | '카드영수증'
  | '필요없음';

// Admin Related Types
export interface Admin {
  id: number;
  adminUserId: string;
  password: string;
  role: string;
  tokenVersion: number;
}

export interface AdminAuthToken {
  id: number;
  adminId: number;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

// Engineer Related Types
export interface Engineer {
  engineerId: number;
  name: string;
  phoneNumber: string;
  location: string;
  remark?: string;
}

export interface Skill {
  skillId: number;
  skill: string;
}

export interface EngineerSkill {
  engineerId: number;
  skillId: number;
}

export interface EngineerSkillRemark {
  engineerSkillRemarkId: number;
  engineerId: number;
  skillRemark: string;
}

export interface Weekday {
  weekdayId: number;
  dayName: DayNameEnum;
}

export interface DayOff {
  engineerId: number;
  weekdayId: number;
}

export interface Holiday {
  holidayId: number;
  engineerId: number;
  holiday: Date;
}

export interface EngineerPayday {
  engineerId: number;
  weekdayId: number;
  isPay: boolean;
}

export interface EngineerDailyEarning {
  engineerDailyearningId: number;
  engineerId: number;
  date: Date;
  dailyAmount: number;
}

export interface Calendar {
  calendarId: number;
  weekStartDate: Date;
  weekEndDate: Date;
}

export interface EngineerWeeklyEarning {
  engineerId: number;
  calendarId: number;
  totalWeeklyAmount: number;
}

export interface CommissionRate {
  commissionRateId: number;
  rate: RateEnum;
}

export interface EngineerCommissionRate {
  engineerId: number;
  commissionRateId: number;
}

// Customer Related Types
export interface Customer {
  customerId: number;
  customerName: string;
  phoneNumber: string;
  location: string;
  bookingDate: Date;
  orderTimeId: number;
  remark?: string;
}

// Payment Related Types
export interface PaymentType {
  paymentMethodTypeId: number;
  name: PaymentMethodEnum;
}

export interface ReceiptDocs {
  receiptDocsId: number;
  receiptType: ReceiptTypeEnum;
}

// Order Related Types
export interface OrderTime {
  orderTimeId: number;
  time: string;
}

export interface EngineerCustomerTime {
  engineerCustomerTimeId: number;
  engineerCustomerId: number;
  orderTimeId: number;
}

export interface EngineerCustomer {
  engineerCustomerId: number;
  engineerId: number;
  customerId: number;
  orderPayId: number;
}

export interface Order {
  orderId: number;
  customerId: number;
  productDetailId: number;
  productRemark?: string;
  count: number;
  discountAmount: number;
  totalAmount: number;
  remark?: string;
}

export interface OrdersPay {
  orderPayId: number;
  customerId: number;
  totalAmount: number;
  depositAmount: number;
  balanceAmount: number;
  discountAmount: number;
  depositMethodTypeId: number;
  balanceMethodTypeId: number;
  depositReceiptId: number;
  balanceReceiptId: number;
  receiptIssued: boolean;
}

// Product Related Types
export interface ProductDetail {
  productDetailId: number;
  productTypeId: number;
  productId: number;
}

export interface OrderInfo {
  orderInfoId: number;
  orderId: number;
  orderPayId: number;
}

export interface ProductType {
  productTypeId: number;
  product: string;
}

export interface WashingMachine {
  washingMachineId: number;
  name: string;
  productTypeId: number;
}

export interface AirCondition {
  airConditionId: number;
  name: string;
  productTypeId: number;
}
