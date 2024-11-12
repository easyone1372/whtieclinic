'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, IconButton, Typography } from '@mui/material';
import { sampleSalesData } from '@/constants/MainCalendarSalesData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ShoppingCart, ArrowUpRight, CalendarDays, CreditCard } from 'lucide-react';

moment.locale('ko');
const localizer = momentLocalizer(moment);

interface SalesData {
  date: string;
  totalOrders: number;
  dailySales: number;
}

interface CalendarEventType extends Event {
  title: string;
  start: Date;
  end: Date;
  resource?: {
    orders: number;
    sales: number;
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

  const events: CalendarEventType[] = sampleSalesData.map((data) => {
    const date = moment(data.date).toDate();
    return {
      title: `${data.totalOrders}건 / ₩${data.dailySales.toLocaleString()}`,
      start: date,
      end: date,
      allDay: true,
      resource: {
        orders: data.totalOrders,
        sales: data.dailySales,
      },
    };
  });

  // 주간 데이터 계산 함수
  const calculateWeeklySummaries = (salesData: SalesData[]): WeeklySummary[] => {
    const weeklySummaries: WeeklySummary[] = [];
    const currentMonth = moment(currentDate).month();

    // 현재 월의 시작일
    let startOfMonth = moment(currentDate).startOf('month');

    // 각 주의 데이터 계산
    while (startOfMonth.month() === currentMonth) {
      const endOfWeek = moment(startOfMonth).endOf('week');
      const weekData = salesData.filter((data) => {
        const date = moment(data.date);
        return date.isSameOrAfter(startOfMonth, 'day') && date.isSameOrBefore(endOfWeek, 'day');
      });

      if (weekData.length > 0) {
        weeklySummaries.push({
          startDate: startOfMonth.format('M/D'),
          endDate: endOfWeek.format('M/D'),
          totalSales: weekData.reduce((sum, data) => sum + data.dailySales, 0),
          totalOrders: weekData.reduce((sum, data) => sum + data.totalOrders, 0),
        });
      }

      startOfMonth = endOfWeek.add(1, 'day');
    }

    return weeklySummaries;
  };

  const calculateWeeklyMonthlySales = (salesData: SalesData[]) => {
    const today = new Date();

    const weeklyData = salesData.slice(-7);
    const monthlyData = salesData.filter(
      (data) => new Date(data.date).getMonth() === today.getMonth()
    );

    const totalWeeklySales = weeklyData.reduce((acc, data) => acc + data.dailySales, 0);
    const totalWeeklyOrders = weeklyData.reduce((acc, data) => acc + data.totalOrders, 0);
    const totalMonthlySales = monthlyData.reduce((acc, data) => acc + data.dailySales, 0);
    const totalMonthlyOrders = monthlyData.reduce((acc, data) => acc + data.totalOrders, 0);

    return {
      totalWeeklySales,
      totalWeeklyOrders,
      totalMonthlySales,
      totalMonthlyOrders,
    };
  };

  const { totalWeeklySales, totalWeeklyOrders, totalMonthlySales, totalMonthlyOrders } =
    calculateWeeklyMonthlySales(sampleSalesData);

  const weeklySummaries = calculateWeeklySummaries(sampleSalesData);

  const handleSelectEvent = (event: CalendarEventType) => {
    console.log('Selected event:', event);
  };

  return (
    <div className="max-w-full m-auto pl-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="주간 총 매출"
          value={`￦${totalWeeklySales.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          // trend={12}
        />
        <StatCard
          title="주간 총 주문"
          value={totalWeeklyOrders.toLocaleString()}
          subtitle="지난 7일 동안의 총 주문 수"
          icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="월간 총 매출"
          value={`￦${totalMonthlySales.toLocaleString()}`}
          icon={<CreditCard className="w-6 h-6 text-blue-600" />}
          // trend={8}
        />
        <StatCard
          title="월간 총 주문"
          value={totalMonthlyOrders.toLocaleString()}
          subtitle="이번 달의 총 주문 수"
          icon={<CalendarDays className="w-6 h-6 text-blue-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 h-[900px] bg-white p-4 rounded-lg ">
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

        <div className="lg:col-span-1 bg-white rounded-lg pt-16 ">
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
