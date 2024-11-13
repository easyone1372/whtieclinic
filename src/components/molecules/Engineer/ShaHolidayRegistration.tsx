'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ShadcnDatePicker from '@/components/atom/Calendar/ShaDatePicker';

export type ShaHolidayRegistrationProps = {
  registeredHolidays: string[]; // registeredHolidays는 string[]으로 받음
  onHolidaysChange: (newHolidays: string[]) => void; // onHolidaysChange도 string[] 배열로 처리
};

const ShaHolidayRegistration: React.FC<ShaHolidayRegistrationProps> = ({
  registeredHolidays = [], // 기본값을 빈 배열로 설정
  onHolidaysChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 날짜 변경 시, 선택된 날짜를 string 형식으로 저장
  const handleDateChange = (newValue: Date | undefined) => {
    setSelectedDate(newValue || null);
  };

  const handleRegister = () => {
    if (selectedDate) {
      const newHoliday = format(selectedDate, 'yyyy-MM-dd'); // 선택된 날짜를 string으로 변환

      // 중복 확인
      if (registeredHolidays.includes(newHoliday)) {
        alert('이미 등록된 날짜입니다.');
        return;
      }

      // 새로운 날짜 추가
      const newHolidays = [...registeredHolidays, newHoliday];
      newHolidays.sort(); // 날짜 순으로 정렬
      onHolidaysChange(newHolidays); // 부모 컴포넌트로 상태 변경
      setSelectedDate(null); // 날짜 선택 초기화
    }
  };

  const handleRemoveDate = (dateToRemove: string) => {
    const newHolidays = registeredHolidays.filter((holiday) => holiday !== dateToRemove);
    onHolidaysChange(newHolidays);
  };

  return (
    <div className="flex">
      <div className="flex items-center">
        <ShadcnDatePicker
          value={selectedDate || undefined}
          onChange={handleDateChange}
          dateFormat="yyyy년 MM월 dd일"
        />
        <div className="mx-2">
          <Button onClick={handleRegister} size="sm">
            등록
          </Button>
        </div>
      </div>

      <ScrollArea className="max-h-20 w-52 rounded-md border overflow-auto">
        <div className="p-4">
          {/* 등록된 날짜가 배열인지 확인하고, map을 안전하게 사용 */}
          {Array.isArray(registeredHolidays) &&
            registeredHolidays.map((holiday, index) => (
              <div key={index} className="flex items-center text-sm">
                <span>{format(new Date(holiday), 'yyyy년 MM월 dd일', { locale: ko })}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-6 px-2"
                  onClick={() => handleRemoveDate(holiday)}
                >
                  ×
                </Button>
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ShaHolidayRegistration;
