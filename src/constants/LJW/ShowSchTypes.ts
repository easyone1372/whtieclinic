//기사리스트 맵핑을 위한 타입지정
export type schEngType = {
  engineer_id: number;
  engineer_name: string;
};

//기사리스트 컴포넌트를 위한 타입지정
export type SchEngListType = {
  engineerList: schEngType[];
  onClick: (engineer_id: number) => void;
};

//스케쥴에 보여지는 데이터들을 위한 타입
export type SchShowDisplay = {
  order_id: number;
  engineer_id: number;
  customer_id: number;
  booking_date: Date; //예약날짜
  engineer_name: string;
  customer_name: string;
  customer_addr: string;
  customer_phone: string;
  order_product_type: string; //에어컨|세탁기
  order_product_detail: string; //드럼, 원웨이 등
  order_count: number; //주문대수
  total_price: number; //최종가격
  order_remarks?: string; //주문 특이사항
  customer_remarks?: string; //고객 특이사항
};

export type SchTimeLineProps = {
  scheduleData: SchShowDisplay[];
  onEditOrder: (order: SchShowDisplay) => void;
  isEditing: boolean;
  selectedDate: Date;
};

export const timeSlots = [
  '8시 이전',
  '08:00 ~ 09:00',
  '09:00 ~ 10:00',
  '10:00 ~ 11:00',
  '11:00 ~ 12:00',
  '12:00 ~ 13:00',
  '13:00 ~ 14:00',
  '14:00 ~ 15:00',
  '15:00 ~ 16:00',
  '16:00 ~ 17:00',
  '17:00 ~ 18:00',
  '18:00 ~ 19:00',
  '19시 이후',
];

export type TimeSlot = (typeof timeSlots)[number];
