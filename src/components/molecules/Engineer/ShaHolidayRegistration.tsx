'use client';

import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ShadcnDatePicker from '@/components/atom/Calendar/ShaDatePicker';

export type ShaHolidayRegistrationProps = {
  registeredHolidays: Date[];
  onHolidaysChange: (newHolidays: Date[]) => void;
};

const ShaHolidayRegistration: React.FC<ShaHolidayRegistrationProps> = ({
  registeredHolidays,
  onHolidaysChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (newValue: Date | undefined) => {
    setSelectedDate(newValue || null);
  };

  const handleRegister = () => {
    if (selectedDate) {
      const isDuplicate = registeredHolidays.some((date) => isSameDay(date, selectedDate));
      if (isDuplicate) {
        alert('이미 등록된 날짜입니다.');
        return;
      }

      const newHolidays = [...registeredHolidays, selectedDate];
      newHolidays.sort((a, b) => a.getTime() - b.getTime());
      onHolidaysChange(newHolidays);
      setSelectedDate(null);
    }
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

      <ScrollArea className="max-h-20 w-52 rounded-md border ">
        <div className="p-4">
          {registeredHolidays.map((holiday, index) => (
            <div key={index} className="text-sm">
              {format(holiday, 'yyyy년 MM월 dd일', { locale: ko })}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ShaHolidayRegistration;
