'use client';

import ShaDrawer from '@/components/molecules/drawer/ShaDrawer';
import { Engineer } from '@/constants/types/type';
import { useState } from 'react';

const initialEngineerData: Engineer[] = [
  {
    engineerId: 1,
    engineerName: '홍길동',
    engineerPhone: '01012345678',
    engineerAddr: '인천 부평구',
    engineerCommission: 50,
    engineerPayday: '일요일',
  },
];

const Page = () => {
  const [filter, setFilter] = useState(''); // 필터 입력 상태
  const [engineerlist, setEngineerList] = useState<Engineer[]>(initialEngineerData);
  // const [engineers, setEngineers] = useState<Engineer[]>([]); // Engineer 타입의 배열
  const [selectedData, setSelectedData] = useState<Engineer | null>(null); // 선택된 엔지니어 정보
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer 열림 상태

  // 필터 변경 핸들러
  const handleFilterChange = (value: string) => setFilter(value);

  // 기사 선택 핸들러
  const handleItemClick = (item: Engineer) => {
    setSelectedData(item);
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <ShaDrawer
        data={engineerlist}
        filterKeys={['engineerName', 'engineerPhone', 'engineerAddr']}
        filter={filter}
        onFilterChange={handleFilterChange}
        onItemClick={handleItemClick}
        drawerTitle="기사님 목록"
        drawerDescription="기사님을 클릭하세요."
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
      />
      {selectedData && (
        <div>
          <h2>{selectedData.engineerName}님의 기본정보</h2>
        </div>
      )}
    </div>
  );
};

export default Page;
