'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { TrendingUp, ShoppingCart, ArrowUpRight, CalendarDays, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/utils/axios';

moment.locale('ko');
const localizer = momentLocalizer(moment);

interface ScheduleData {
  orderId: number;
  engineerId: number;
  orderDate: string;
  orderTotalAmount: number;
  engineerName: string;
  customerName: string;
  orderProduct: string;
  orderCount: number;
}

interface CalendarEventType extends Event {
  title: string;
  start: Date;
  end: Date;
  resource?: {
    orders: number;
    sales: number;
    details: ScheduleData[]; // 이 부분 추가
  };
}

interface WeeklySummary {
  startDate: string;
  endDate: string;
  totalSales: number;
  totalOrders: number;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
          {icon}
        </div>
        {trend && (
          <span className="flex items-center text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            {trend}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
    </CardContent>
  </Card>
);

const WeeklySummaryCard = ({ summary }: { summary: WeeklySummary }) => (
  <div className="border-b border-gray-200 py-4">
    <div className="text-sm text-gray-500 mb-2">
      {summary.startDate} ~ {summary.endDate}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-sm font-medium text-gray-500">주문</div>
        <div className="text-lg font-bold text-gray-900">
          {summary.totalOrders.toLocaleString()}건
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">매출</div>
        <div className="text-lg font-bold text-blue-600">
          ₩{summary.totalSales.toLocaleString()}
        </div>
      </div>
    </div>
  </div>
);

const SalesDashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEventType[]>([]);
  const [salesSummary, setSalesSummary] = useState({
    totalWeeklySales: 0,
    totalWeeklyOrders: 0,
    totalMonthlySales: 0,
    totalMonthlyOrders: 0,
  });
  const [weeklySummaries, setWeeklySummaries] = useState<WeeklySummary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startOfMonth = moment(currentDate).startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(currentDate).endOf('month').format('YYYY-MM-DD');

        const response = await api.get<ScheduleData[]>('/engineer-management/engineers/schedules', {
          params: {
            startDate: startOfMonth,
            endDate: endOfMonth,
          },
        });

        // 날짜별로 데이터 그룹화
        const dailyData = response.data.reduce((acc, schedule) => {
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

        // 캘린더 이벤트 변환
        const calendarEvents = Object.entries(dailyData).map(([date, data]) => ({
          title: `${data.orders}건 / ₩${data.sales.toLocaleString()}`,
          start: new Date(date),
          end: new Date(date),
          resource: {
            orders: data.orders,
            sales: data.sales,
            details: data.details,
          },
        }));

        setEvents(calendarEvents);

        // 주간/월간 요약 계산
        const now = moment(currentDate);
        const startOfWeek = now.clone().startOf('week');
        const endOfWeek = now.clone().endOf('week');

        const weeklySales = calendarEvents
          .filter((event) => moment(event.start).isBetween(startOfWeek, endOfWeek, 'day', '[]'))
          .reduce((sum, event) => sum + event.resource!.sales, 0);

        const weeklyOrders = calendarEvents
          .filter((event) => moment(event.start).isBetween(startOfWeek, endOfWeek, 'day', '[]'))
          .reduce((sum, event) => sum + event.resource!.orders, 0);

        const monthlySales = calendarEvents.reduce((sum, event) => sum + event.resource!.sales, 0);
        const monthlyOrders = calendarEvents.reduce(
          (sum, event) => sum + event.resource!.orders,
          0
        );

        setSalesSummary({
          totalWeeklySales: weeklySales,
          totalWeeklyOrders: weeklyOrders,
          totalMonthlySales: monthlySales,
          totalMonthlyOrders: monthlyOrders,
        });

        // 주간 요약 데이터 계산
        const weekSummaries: WeeklySummary[] = [];
        let startOfCurrentWeek = moment(currentDate).startOf('month').startOf('week');

        while (startOfCurrentWeek.isBefore(moment(currentDate).endOf('month'))) {
          const endOfCurrentWeek = startOfCurrentWeek.clone().endOf('week');

          const weekData = calendarEvents.filter((event) =>
            moment(event.start).isBetween(startOfCurrentWeek, endOfCurrentWeek, 'day', '[]')
          );

          if (weekData.length > 0) {
            weekSummaries.push({
              startDate: startOfCurrentWeek.format('M/D'),
              endDate: endOfCurrentWeek.format('M/D'),
              totalSales: weekData.reduce((sum, event) => sum + event.resource!.sales, 0),
              totalOrders: weekData.reduce((sum, event) => sum + event.resource!.orders, 0),
            });
          }

          startOfCurrentWeek.add(1, 'week');
        }

        setWeeklySummaries(weekSummaries);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchData();
  }, [currentDate]);

  const handleSelectEvent = (event: CalendarEventType) => {
    console.log('Selected event:', event.resource?.details);
  };

  return (
    <div className="max-w-full m-auto pl-10 pt-5 pr-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="주간 총 매출"
          value={`￦${salesSummary.totalWeeklySales.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="주간 총 주문"
          value={salesSummary.totalWeeklyOrders.toLocaleString()}
          subtitle="지난 7일 동안의 총 주문 수"
          icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="월간 총 매출"
          value={`￦${salesSummary.totalMonthlySales.toLocaleString()}`}
          icon={<CreditCard className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="월간 총 주문"
          value={salesSummary.totalMonthlyOrders.toLocaleString()}
          subtitle="이번 달의 총 주문 수"
          icon={<CalendarDays className="w-6 h-6 text-blue-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 h-[900px] bg-white p-4 rounded-lg">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            onSelectEvent={handleSelectEvent}
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            views={['month']}
            messages={{
              next: '다음',
              previous: '이전',
              today: '오늘',
              month: '월',
              week: '주',
              day: '일',
            }}
          />
        </div>

        <div className="lg:col-span-1 bg-white rounded-lg pt-16">
          <Card>
            <CardHeader>
              <CardTitle>주간 매출 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weeklySummaries.map((summary, index) => (
                  <WeeklySummaryCard key={index} summary={summary} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
