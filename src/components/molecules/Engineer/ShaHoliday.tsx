'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Days } from '@/constants/Days';
import ShadcnDropdown from '@/components/atom/DropdownBox/ShaDropDown';

export type ShaHolidayProps = {
  selectedDays: string[];
  onDaysChange: (newDays: string[]) => void;
};

const ShaHoliday: React.FC<ShaHolidayProps> = ({ selectedDays, onDaysChange }) => {
  const [selectedDay, setSelectedDay] = useState<string>('');

  const DayOptions = Days.map((day) => ({ text: day, value: day }));

  const handleDayChange = (value: string) => {
    setSelectedDay(value);
  };

  const handleRegister = () => {
    if (selectedDay) {
      const isDuplicate = selectedDays.includes(selectedDay);
      if (isDuplicate) {
        alert('이미 등록된 요일입니다.');
        return;
      }

      const newDays = [...selectedDays, selectedDay];
      // Days 배열의 순서대로 정렬
      newDays.sort((a, b) => Days.indexOf(a) - Days.indexOf(b));
      onDaysChange(newDays);
      setSelectedDay('');
    }
  };

  return (
    <div className="flex">
      <div className="flex items-center">
        <ShadcnDropdown
          label="요일"
          value={selectedDay}
          onChange={handleDayChange}
          options={DayOptions}
        />
        <div className="mx-2">
          <Button onClick={handleRegister} size="sm">
            등록
          </Button>
        </div>
      </div>

      <ScrollArea className="max-h-20 w-20 rounded-md border ">
        <div className="p-4">
          {selectedDays.map((day, index) => (
            <div key={index} className="text-sm">
              {day}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ShaHoliday;
