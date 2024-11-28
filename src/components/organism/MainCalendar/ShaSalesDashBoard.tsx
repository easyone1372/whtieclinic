// pages/ShaSalesDashboard.tsx
'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSalesData } from '@/data/ShaUseSalesData';
import { CalendarEventType } from '@/constants/types/MainCalendarType';
import { ShaSalesStatsGrid } from '@/components/molecules/SalesCalendar/ShaStartGrid';
import { ShaWeeklySummary } from '@/components/molecules/SalesCalendar/ShaWeeklySummary';

// moment 설정
moment.locale('ko');
const localizer = momentLocalizer(moment);

const ShaSalesDashboard = () => {
  // 현재 날짜 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date());

  // 커스텀 훅을 통한 데이터 가져오기
  const { events, salesSummary, weeklySummaries } = useSalesData(currentDate);

  // 이벤트 클릭 핸들러
  const handleSelectEvent = (event: CalendarEventType) => {
    // 이벤트 클릭 시 처리 로직
    // console.log('Selected event:', event.resource?.details);
  };

  // 달력 네비게이션 핸들러
  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="max-w-full m-auto pl-10 pt-5 pr-5">
      {/* 상단 통계 카드 그리드 */}
      <ShaSalesStatsGrid salesSummary={salesSummary} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 캘린더 영역 */}
        <div className="lg:col-span-3 h-[900px] bg-white p-4 rounded-lg shadow">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            onSelectEvent={handleSelectEvent}
            date={currentDate}
            onNavigate={handleNavigate}
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

        {/* 우측 주간 요약 */}
        <ShaWeeklySummary summaries={weeklySummaries} />
      </div>
    </div>
  );
};

export default ShaSalesDashboard;
