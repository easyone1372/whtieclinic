import { productCategories } from '../../productCategory';

//ShaScehduleTableRows.tsx에서 사용
//스케쥴표 좌측 timeslot
type scheduleTimeslot = {
  orderTimeId: number;
  orderTimeContent: string;
};

type orderType = {
  orderId: number;
  customerId: number;
  engineerId?: number;
  startTime: Date;
  customerName: string;
  orderAddress: string;
  customerPhone: string;
  orderProduct: string;
  customerRemark: string;
  orderUniqueDetails: string;
  orderItemCount: number;
  finalPrice: number;
};

type engineerListType = {
  engineerId: number; // 기사 ID (Primary Key)
  engineerName: string; // 기사 이름
  holidayRegistration: Date[]; // 휴무일 목록
  regularHoliday: string[]; // 정기 휴무일 (요일)
};
