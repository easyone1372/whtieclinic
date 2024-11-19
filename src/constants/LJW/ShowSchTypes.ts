//ShowSchTypes.ts

import { showSchArray } from './ShowSchArray';

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
  engineerName?: string; 
  customerId: number;
  orderDate: string;
  orderTimeslot: string;
  customerName: string;
  customerAddr: string;
  customerPhone: string;
  orderProduct: string;
  orderProductDetail: string;
  orderCount: number;
  orderTotalAmount: number;
  orderRemarks: string;
  customerRemarks: string;
};

//datatable 기본 props
export type SchTimeLineProps = {
  scheduleData: SchShowDisplay[];
  onEditRow: (timeSlot: string) => void;
  isEditing: boolean;
  selectedDate: Date;
};

//시간대 설정 배열 - 드롭박스 등에 사용
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

//테이블 행을 위한 타입 정의
export type SchTableRow = {
  [K in (typeof showSchArray)[number] | 'timeSlot']: string;
};

export type SchTableColumn = keyof SchTableRow;
