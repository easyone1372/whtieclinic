import { Event } from 'react-big-calendar';

// 일정 데이터 타입
type ScheduleData = {
  orderId: number;
  engineerId: number;
  orderDate: string;
  orderTotalAmount: number;
  engineerName: string;
  customerName: string;
  orderProduct: string;
  orderCount: number;
};

// 캘린더 이벤트 타입
type CalendarEventType = Event & {
  title: string;
  start: Date;
  end: Date;
  resource?: {
    orders: number;
    sales: number;
    details: ScheduleData[];
  };
};

// 주간 요약 타입
type WeeklySummary = {
  startDate: string;
  endDate: string;
  totalSales: number;
  totalOrders: number;
};

// 매출 요약 타입
type SalesSummary = {
  totalWeeklySales: number;
  totalWeeklyOrders: number;
  totalMonthlySales: number;
  totalMonthlyOrders: number;
};

export type { ScheduleData, CalendarEventType, WeeklySummary, SalesSummary };
