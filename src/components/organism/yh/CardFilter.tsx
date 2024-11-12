'use client';

import React from 'react';
import ShaInput from '@/components/atom/Input/ShaInput';
import ACard from '@/components/molecules/Card/ACards';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FilterProps } from '@/constants/yh/EngineerTypeData';


const CardFilter = ({ data, filter, onFilterChange, onItemClick }: FilterProps) => {
  const handleInputChange = (value: string) => {
    const simulatedEvent = {
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>;
    onFilterChange(simulatedEvent);
  };

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div className="p-4 flex-shrink-0">
        <ShaInput
          placeholder="이름, 주소 또는 전화번호로 검색"
          value={filter}
          onChange={handleInputChange}
          size="medium"
        />
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col space-y-4 px-4">
          {data.map(([_, engineer]) => (
            <ACard
              key={engineer.engineer_id}
              name={engineer.name}
              tel={engineer.phone_number}
              address={engineer.location}
              onClick={() => onItemClick([engineer.engineer_id.toString(), engineer])}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CardFilter;