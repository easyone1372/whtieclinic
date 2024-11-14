'use client';

import React from 'react';
import ACard from '@/components/molecules/Card/Cards';
import ShaFilter from '../Filter/ShaFilter';
import { ScrollArea } from '@/components/ui/scroll-area';

// 카드필터 타입정의 (제너릭화 시켜서 추상화시킴 )
export type CardFilterProps<T> = {
  data: T[]; // 필터링할 데이터 배열
  filterKeys: (keyof T)[]; // 필터링할 데이터의 속성 키 목록
  filter: string; // 현재 필터 값
  onFilterChange: (value: string) => void; // 필터링 변경 함수
  onItemClick: (item: T) => void; // 아이템 클릭 시 호출될 함수
};

const CardFilter = <T extends { [key: string]: any }>({
  data,
  filterKeys,
  filter,
  onFilterChange,
  onItemClick,
}: CardFilterProps<T>) => {
  // 필터링된 데이터
  const filteredData =
    data && filterKeys.length > 0
      ? data.filter((item) =>
          filterKeys.some((key) =>
            String(item[key] || '')
              .toLowerCase()
              .includes(filter.toLowerCase())
          )
        )
      : []; // data가 없으면 빈 배열 반환

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {/* 필터 입력 필드 */}
      <div>
        <ShaFilter
          placeholder="이름, 주소 또는 전화번호로 검색"
          value={filter}
          onChange={(value) => onFilterChange(value)}
        />
      </div>

      <div className="flex flex-col px-4 ">
        {filteredData.map((item, index) => (
          <ACard
            key={index}
            name={item.engineerName}
            tel={item.engineerPhone}
            address={item.engineerAddr}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardFilter;
