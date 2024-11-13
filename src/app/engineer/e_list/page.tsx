'use client';

import React, { useState } from 'react';
import ShaDrawer from '@/components/molecules/drawer/ShaDrawer';

// 예제 데이터
const engineers = [
  { name: '김영수', phone_number: '01023456789', address: '서울 강남구' },
  { name: '박민준', phone_number: '01034567890', address: '부산 해운대구' },
  { name: '이서윤', phone_number: '01045678901', address: '대전 서구' },
  { name: '정하은', phone_number: '01056789012', address: '광주 북구' },
  { name: '최준호', phone_number: '01067890123', address: '울산 중구' },
];




const Page = () => {
  const [filter, setFilter] = useState('');

  // 필터 문자열 변경 함수
  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  // 카드 항목 클릭 시 호출 함수
  const handleItemClick = (item: { name: string; phone_number: string; address: string }) => {
    console.log('선택한 기사님:', item);
  };

  return (
    <div>
      <ShaDrawer
        data={engineers} // 필터링할 데이터
        filterKeys={['name', 'phone_number', 'address']} // 필터 기준이 될 키 목록
        filter={filter} // 필터 문자열
        onFilterChange={handleFilterChange} // 필터 문자열 변경 함수
        onItemClick={handleItemClick} // 카드 항목 클릭 함수
        drawerTitle="기사님 목록"
        drawerDescription="기사님을 클릭하세요."
      />
    </div>
  );
};

export default Page;
