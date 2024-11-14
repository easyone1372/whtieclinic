import React, { useEffect, useState } from 'react';
import ShaFilter from '@/components/molecules/Filter/ShaFilter';
import ATable from '@/components/molecules/Table/ATable';

type FilterTableProps<T> = {
  headers: { [key: string]: string };
  data: T[];
  columns: (keyof T)[];
  placeholder?: string;
};

const FilterTable = <T extends { [key: string]: any }>({
  headers,
  data,
  columns,
  placeholder = '검색어를 입력하세요',
}: FilterTableProps<T>) => {
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // data가 변경될 때마다 filteredData 초기화
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // 필터 값에 따라 데이터를 필터링하는 함수
  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        val ? String(val).toLowerCase().includes(value.toLowerCase()) : false
      )
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div>
        <ShaFilter placeholder={placeholder} value={filterValue} onChange={handleFilterChange} />
      </div>
      <ATable headers={headers} data={filteredData} columns={columns} />
    </>
  );
};

export default FilterTable;
