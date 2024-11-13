'use client';

import React from 'react';
import ACard from '@/components/molecules/Card/Cards';
import ShaFilter from '../Filter/ShaFilter';

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
      <div className="p-4 flex-shrink-0">
        <ShaFilter
          placeholder="이름, 주소 또는 전화번호로 검색"
          value={filter}
          onChange={(value) => onFilterChange(value)}
        />
      </div>

      {/* 필터링된 카드 리스트 */}
      <div className="flex flex-col space-y-4 px-4 overflow-y-auto">
        {filteredData.map((item, index) => (
          <ACard
            key={index}
            name={item.name} // 이름
            tel={item.phone_number} // 전화번호
            address={item.address} // 주소
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardFilter;
