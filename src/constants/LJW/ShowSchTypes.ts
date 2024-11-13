//ShowSchTypes.ts

//기사리스트 맵핑을 위한 타입지정
export type schEngType = {
  engineerId: number;
  engineerName: string;
};

//기사리스트 컴포넌트를 위한 타입지정
export type SchEngListType = {
  engineerList: schEngType[];
  onClick: (engineerId: number) => void;
};

//스케쥴에 보여지는 데이터들을 위한 타입
export type SchShowDisplay = {
  orderId: number;
  engineerId: number;
  customerId: number;
  orderDate: Date; //예약날짜
  orderTimeslot: string; //예약 시간. 고민.
  engineerName: string;
  customerName: string;
  customerAddr: string;
  customerPhone: string;
  orderProduct: string; //에어컨|세탁기
  orderProductDetail: string; //드럼, 원웨이 등
  orderCount: number; //주문대수
  orderTotalAmount: number; //최종가격
  orderRemarks?: string; //주문 특이사항
  customerRemarks?: string; //고객 특이사항
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
