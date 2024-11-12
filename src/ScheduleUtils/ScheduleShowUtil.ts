// utils/ScheduleUtils/ScheduleShowUtil.ts

import { Engineer, ScheduleDisplayOrder } from '@/constants/jwType/jwtype';

export const getEngineersByDate = async (date: Date): Promise<Engineer[]> => {
  try {
    const selectedDay = date.toLocaleString('ko-KR', { weekday: 'long' });
    const response = await fetch('/api/engineers');
    const data = await response.json();

    const engineers: Engineer[] = Array.isArray(data) ? data : data.engineers || [];

    // 휴무일 체크
    return engineers.filter((engineer) => {
      // 정규 휴무 체크 (dayoffs)
      const isRegularHoliday = engineer.dayoffs.some(
        (dayoff) => dayoff.weekday_id.toString() === selectedDay
      );

      // 비정규 휴무 체크 (holidays)
      const isHoliday = engineer.holidays.some(
        (holiday) => new Date(holiday.holiday).toDateString() === date.toDateString()
      );

      return !isHoliday && !isRegularHoliday;
    });
  } catch (error) {
    console.error('Error fetching engineers:', error);
    return [];
  }
};

export const getOrdersByEngineerAndDate = async (
  engineerId: number,
  date: Date
): Promise<ScheduleDisplayOrder[]> => {
  try {
    // API 호출 시 날짜와 엔지니어 ID로 필터링
    const response = await fetch(`/api/orders?engineerId=${engineerId}&date=${date.toISOString()}`);
    const data = await response.json();

    return data.map((item: any) => ({
      OrderId: item.order_id,
      EngineerId: item.engineer_id,
      StartTime: new Date(item.start_time),
      EndTime: new Date(item.end_time),
      CustomerName: item.customer_name,
      Address: item.location,
      PhoneNumber: item.phone_number,
      Product: item.product_name,
      ItemCount: item.count,
      FinalPrice: item.total_amount,
      CustomerUniqueDetails: item.remark,
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};
