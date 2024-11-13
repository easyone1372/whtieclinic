import React, { useState } from 'react';
import ShaFilter from '@/components/molecules/Filter/ShaFilter';
import ATable from '@/components/molecules/Table/ATable';

type FilterTableProps<T> = {
  headers: { [key: string]: string }; // 테이블 헤더
  data: T[]; // 테이블 데이터
  columns: (keyof T)[]; // 열 키 배열
  placeholder?: string; // 필터의 플레이스홀더 텍스트
};

// FilterTable 컴포넌트 정의
const FilterTable = <T extends { [key: string]: any }>({
  headers,
  data,
  columns,
  placeholder = '검색어를 입력하세요',
}: FilterTableProps<T>) => {
  // 검색어와 필터링된 데이터를 관리
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // 필터 값에 따라 데이터를 필터링하는 함수
  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    const filtered = data.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div>
        {/* 필터 컴포넌트 */}
        <ShaFilter placeholder={placeholder} value={filterValue} onChange={handleFilterChange} />
      </div>
      {/* 테이블 컴포넌트 */}
      <ATable headers={headers} data={filteredData} columns={columns} />
    </>
  );
};

export default FilterTable;
