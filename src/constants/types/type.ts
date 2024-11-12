// 엔지니어 관련 타입
export type Engineer = {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
  remark: string;
  commission_rate: number;
  payday: string;
  is_paid: boolean;
  daily_earnings: {
    date: string;
    daily_amount: number;
  }[];
  skills: string[];
};

export type EngineerPay = {
  id: number;
  engineerId: number;
  date: string;
  daily_amount: number;
};

export type EngineerPayDay = {
  id: number;
  engineerId: number;
  weekdays: string;
  is_pay: boolean;
};

export type EngineerCommissionRate = {
  id: number;
  engineerId: number;
  rateId: number;
};

export type ApiResponse = {
  engineer: Engineer[];
  engineerPay: EngineerPay[];
  engineerPayDay: EngineerPayDay[];
  EngineerCommissionRates: EngineerCommissionRate[];
};

export type FooterItem = {
  label: string;
  value: string | number | boolean;
  isEditable?: boolean;
  onValueChange?: (value: string) => void;
  renderValue?: (value: any) => React.ReactNode;
};

// 고객 관련 타입
export type CustomerProps = {
  name: string;
  tel: string;
  address: string;
  bookingDate: string;
  info: string;
  engineer: string;
  cleaning: '세탁기' | '에어컨';
  bill: boolean;
};

export type CustomerInfoValues = {
  reservationDateTime: Date | null;
  name: string;
  phoneNumber: string;
  address: string;
  uniqueDetails: string;
  document: string;
  published: string;
  payment: number;
};

export type Order = CustomerInfoValues & {
  orderId: number;
  startTime: string;
  endTime: string;
  engineerId: number;
  finalPrice: number;
  itemCount: number;
  product: string;
};

// 기타 타입
export type EngineerFormValues = {
  name: string;
  phoneNumber: string;
  residenceArea: string;
  Items: string[];
  ItemsSpecialNotes: string;
  specialNotes: string;
  allowanceRate: string;
  paymentDay: string;
  holidayRegistration: Date[];
  regularHoliday: string[];
};

export type SalesFormData = {
  itemCount: number;
  discountAmount: number;
  finalPrice: number;
  uniqueDetails: string;
  customProduct: string;
  selectedDropdownValue: string;
  selectedCategory: string;
  isDiscountApplied: boolean;
};

export type ShaScheduleResFormValues = {
  reservationDateTime: Date | null;
  customerName: string;
  selectedOrder: string;
  engineerName: string;
};

export type OrderInfo = {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  uniqueDetails: string;
  startTime: string;
  endTime: string;
  engineerId?: string | null;
};

export type EngineerInfo = {
  id: string;
  name: string;
  phoneNumber: string;
  Items: string[];
  specialNotes: string;
  availability: boolean;
  orders: { startTime: string; endTime: string }[];
};

// 추가 타입 (로그인)
export type LoginFormData = {
  username: string;
  password: string;
};

type ShaEngineerListItem = {
  engineerId: number;
  engineerName: string;
};

type ShaScheduleResOrder = {
  id: string;
  details: string;
  startTime: string;
  endTime: string;
  engineerId: string | null;
};

type ShaScheduleResEngineer = {
  id: string;
  name: string;
  isHoliday: boolean;
  availability: boolean;
  orders: { id: string; startTime: string; endTime: string }[];
};
