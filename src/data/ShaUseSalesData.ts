// hooks/useSalesData.ts
import { useState, useEffect } from 'react';
import moment from 'moment';
import api from '@/utils/axios';
import type {
  ScheduleData,
  CalendarEventType,
  WeeklySummary,
  SalesSummary,
} from '@/constants/types/MainCalendarType';

// 스케줄 데이터를 캘린더 이벤트로 변환하는 함수
const processScheduleData = (scheduleData: ScheduleData[]) => {
  // 날짜별로 데이터 그룹화
  const dailyData = scheduleData.reduce((acc, schedule) => {
    const date = schedule.orderDate.split(' ')[0];
    if (!acc[date]) {
      acc[date] = {
        orders: 0,
        sales: 0,
        details: [],
      };
    }
    acc[date].orders += 1;
    acc[date].sales += schedule.orderTotalAmount;
    acc[date].details.push(schedule);
    return acc;
  }, {} as Record<string, { orders: number; sales: number; details: ScheduleData[] }>);

  // 캘린더 이벤트로 변환
  const calendarEvents = Object.entries(dailyData).map(([date, data]) => ({
    title: `${data.orders}건 / ₩${data.sales.toLocaleString()}`,
    start: new Date(date),
    end: new Date(date),
    allDay: true,
    resource: {
      orders: data.orders,
      sales: data.sales,
      details: data.details,
    },
  }));

  return { calendarEvents, dailyData };
};

// 주간 및 월간 매출 요약 계산 함수
const calculateSalesSummary = (events: CalendarEventType[], currentDate: Date): SalesSummary => {
  const now = moment(currentDate);
  const startOfWeek = now.clone().startOf('week');
  const endOfWeek = now.clone().endOf('week');
  const startOfMonth = now.clone().startOf('month');
  const endOfMonth = now.clone().endOf('month');

  // 주간 데이터 필터링 및 계산
  const weeklyEvents = events.filter((event) =>
    moment(event.start).isBetween(startOfWeek, endOfWeek, 'day', '[]')
  );

  const weeklySales = weeklyEvents.reduce((sum, event) => sum + (event.resource?.sales || 0), 0);
  const weeklyOrders = weeklyEvents.reduce((sum, event) => sum + (event.resource?.orders || 0), 0);

  // 월간 데이터 계산 - 현재 월에 속한 이벤트만 필터링
  const monthlyEvents = events.filter((event) =>
    moment(event.start).isBetween(startOfMonth, endOfMonth, 'day', '[]')
  );

  const monthlySales = monthlyEvents.reduce((sum, event) => sum + (event.resource?.sales || 0), 0);
  const monthlyOrders = monthlyEvents.reduce(
    (sum, event) => sum + (event.resource?.orders || 0),
    0
  );

  return {
    totalWeeklySales: weeklySales,
    totalWeeklyOrders: weeklyOrders,
    totalMonthlySales: monthlySales,
    totalMonthlyOrders: monthlyOrders,
  };
};

// 주간 요약 데이터 계산 함수
const calculateWeeklySummaries = (
  events: CalendarEventType[],
  currentDate: Date
): WeeklySummary[] => {
  const weekSummaries: WeeklySummary[] = [];
  const selectedMonth = moment(currentDate);
  let startOfCurrentWeek = selectedMonth.clone().startOf('month').startOf('week');
  const endOfMonth = selectedMonth.clone().endOf('month');

  while (startOfCurrentWeek.isSameOrBefore(endOfMonth)) {
    const endOfCurrentWeek = startOfCurrentWeek.clone().endOf('week');

    const weekData = events.filter((event) =>
      moment(event.start).isBetween(startOfCurrentWeek, endOfCurrentWeek, 'day', '[]')
    );

    if (weekData.length > 0) {
      weekSummaries.push({
        startDate: startOfCurrentWeek.format('M/D'),
        endDate: endOfCurrentWeek.format('M/D'),
        totalSales: weekData.reduce((sum, event) => sum + (event.resource?.sales || 0), 0),
        totalOrders: weekData.reduce((sum, event) => sum + (event.resource?.orders || 0), 0),
      });
    }

    startOfCurrentWeek.add(1, 'week');
  }

  return weekSummaries;
};

// 메인 훅
export const useSalesData = (currentDate: Date) => {
  const [events, setEvents] = useState<CalendarEventType[]>([]);
  const [salesSummary, setSalesSummary] = useState<SalesSummary>({
    totalWeeklySales: 0,
    totalWeeklyOrders: 0,
    totalMonthlySales: 0,
    totalMonthlyOrders: 0,
  });
  const [weeklySummaries, setWeeklySummaries] = useState<WeeklySummary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 현재 월의 시작일과 종료일 설정
        const startOfMonth = moment(currentDate).startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(currentDate).endOf('month').format('YYYY-MM-DD');

        // API 호출
        const response = await api.get<ScheduleData[]>('/engineer-management/engineers/schedules', {
          params: { startDate: startOfMonth, endDate: endOfMonth },
        });

        // 날짜별 데이터 그룹화 및 이벤트 변환
        const { calendarEvents } = processScheduleData(response.data);
        setEvents(calendarEvents);

        // 주간 및 월간 요약 계산
        const summary = calculateSalesSummary(calendarEvents, currentDate);
        setSalesSummary(summary);

        // 주간 요약 계산
        const weekSummaries = calculateWeeklySummaries(calendarEvents, currentDate);
        setWeeklySummaries(weekSummaries);
      } catch (error) {
        // console.error('Error fetching schedule data:', error);
      }
    };

    fetchData();
  }, [currentDate]);

  return { events, salesSummary, weeklySummaries };
};
