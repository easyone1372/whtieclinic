'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Days } from '@/constants/Days';
import ShadcnDropdown from '@/components/atom/DropdownBox/ShaDropDown';

export type ShaHolidayProps = {
  selectedDays: string; // 하나의 요일 문자열
  onDaysChange: (newDay: string) => void; // 요일 변경 함수
};

const ShaHoliday: React.FC<ShaHolidayProps> = ({ selectedDays, onDaysChange }) => {
  const [selectedDay, setSelectedDay] = useState<string>(''); // 선택된 요일

  const DayOptions = Days.map((day) => ({ text: day, value: day }));

  const handleDayChange = (value: string) => {
    setSelectedDay(value);
  };

  const handleRegister = () => {
    if (selectedDay) {
      // 이미 등록된 요일인지 확인
      if (selectedDays === selectedDay) {
        alert('이미 등록된 요일입니다.');
        return;
      }

      // 요일 등록
      onDaysChange(selectedDay);
      setSelectedDay('');
    }
  };

  const handleRemoveDay = () => {
    // 요일 삭제
    onDaysChange('');
  };

  return (
    <div className="flex space-x-4">
      <div className="flex items-center">
        {/* 요일 선택 드롭다운 */}
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

      <ScrollArea className="max-h-20 w-50 rounded-md border">
        <div className="p-4">
          {selectedDays && (
            <div className="flex items-center text-sm ">
              <span>{selectedDays}</span>
              <Button variant="ghost" size="sm" className="ml-2 h-6 px-2" onClick={handleRemoveDay}>
                ×
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ShaHoliday;
