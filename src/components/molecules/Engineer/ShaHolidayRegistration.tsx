'use client';

import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import ShadcnDatePicker from '@/components/atom/Calendar/ShaDatePicker';

export type ShaHolidayRegistrationProps = {
  registeredHolidays: string; // 쉼표로 구분된 날짜 문자열
  onHolidaysChange: (dates: string) => void; // 쉼표로 구분된 날짜 문자열로 반환
};

const ShaHolidayRegistration: React.FC<ShaHolidayRegistrationProps> = ({
  registeredHolidays,
  onHolidaysChange,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  // 문자열을 Date 배열로 변환
  const dates = registeredHolidays ? registeredHolidays.split(',').filter(Boolean) : [];

  const handleDateChange = (newValue: Date | undefined) => {
    setSelectedDate(newValue);
  };

  const handleRegister = () => {
    if (selectedDate) {
      const newDate = format(selectedDate, 'yyyy-MM-dd');
      if (!dates.includes(newDate)) {
        const newDates = [...dates, newDate];
        onHolidaysChange(newDates.join(','));
      }
      setSelectedDate(undefined);
    }
  };

  const handleRemoveDate = (dateToRemove: string) => {
    const newDates = dates.filter((date) => date !== dateToRemove);
    onHolidaysChange(newDates.join(','));
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <ShadcnDatePicker
          value={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy년 MM월 dd일"
        />
        <Button onClick={handleRegister} size="sm" className="ml-2" disabled={!selectedDate}>
          등록
        </Button>
      </div>
      <div className="space-y-1">
        {dates.map((date, index) => (
          <div key={index} className="flex items-center text-sm">
            <span>{format(new Date(date), 'yyyy년 MM월 dd일', { locale: ko })}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-6 px-2"
              onClick={() => handleRemoveDate(date)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShaHolidayRegistration;
