'use client';

import ShaDrawer from '@/components/molecules/drawer/ShaDrawer';
import ACalendar, { CalendarEventType } from '@/components/atom/Calendar/ACalendar';
import ShaButton from '@/components/atom/Button/ShaButton';
import AFooter from '@/components/organism/Footer/AFooter';
import { useEffect, useState } from 'react';

// Mock 데이터 정의 (기사님 정보)
const mockEngineerData = [
  {
    name: '김영수',
    phone_number: '01023456789',
    address: '서울 강남구',
    remark: '성실함',
    commission: 40,
    dayoff: '화요일',
    holiday: '2024-11-22',
    payday: '수요일',
    skills: ['벽걸이', '스탠드'],
  },
  {
    name: '박민준',
    phone_number: '01034567890',
    address: '부산 해운대구',
    remark: '매우 친절함',
    commission: 45,
    dayoff: '수요일',
    holiday: '2024-11-29',
    payday: '목요일',
    skills: ['포웨이', '덕트'],
  },
  // 추가 데이터 ...
];

// Mock 데이터 정의 (일급 정보)
const mockEventData: CalendarEventType[] = [
  {
    title: '일급 100,000원',
    start: new Date(2024, 10, 15),
    end: new Date(2024, 10, 15),
    amount: 100000,
  },
  {
    title: '일급 90,000원',
    start: new Date(2024, 10, 16),
    end: new Date(2024, 10, 16),
    amount: 90000,
  },
];

export const LABEL_MAP = {
  name: '이름',
  phone_number: '전화번호',
  address: '주소',
  remark: '비고',
  commission: '수당률',
  dayoff: '휴무일',
  holiday: '휴가일',
  payday: '지급요일',
  skills: '가능품목',
} as const;

// 타입 정의
export type LabelMapType = typeof LABEL_MAP;

const Page = () => {
  // 상태 관리 변수
  const [filter, setFilter] = useState('');
  const [engineers, setEngineers] = useState(mockEngineerData); // 기사 목록
  const [events, setEvents] = useState<CalendarEventType[]>([]); // 기사 일정
  const [selectedData, setSelectedData] = useState<(typeof mockEngineerData)[0] | null>(null); // 선택된 기사 정보
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer 열림 상태
  const [totalAmount, setTotalAmount] = useState(0); // 총 지급액
  const [finalPayment, setFinalPayment] = useState(0); // 최종 지급액
  const [isChecked, setIsChecked] = useState(''); // 지급 여부 체크 상태
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  // 초기 데이터 로드
  useEffect(() => {
    setEngineers(mockEngineerData);
  }, []);

  // 선택된 기사의 일정 데이터 로드
  useEffect(() => {
    if (selectedData) {
      setEvents(mockEventData); // Mock 데이터 사용
    }
  }, [selectedData]);

  // events 데이터가 로드된 후 지급액 계산
  useEffect(() => {
    if (events.length > 0) {
      calculatePayment();
    }
  }, [events]);

  // 필터 변경 핸들러
  const handleFilterChange = (value: string) => setFilter(value);

  // 기사 선택 핸들러
  const handleItemClick = (item: (typeof mockEngineerData)[0]) => {
    setSelectedData(item);
    setIsDrawerOpen(false);
  };

  // 일정 이벤트 선택 핸들러
  const handleEventSelect = (event: CalendarEventType) => console.log('선택한 이벤트:', event);

  // 총 지급액 및 최종 지급액 계산
  const calculatePayment = () => {
    const weeklyTotal = events.reduce((sum, event) => sum + (event.amount || 0), 0);
    const finalAmount = weeklyTotal * ((selectedData?.commission || 0) / 100);
    setTotalAmount(weeklyTotal);
    setFinalPayment(finalAmount);
  };

  // 수정 버튼 토글 핸들러
  const handleEditToggle = () => setIsEditing(!isEditing);

  // 취소 버튼 핸들러 (수정 취소)
  const handleEditCancel = () => {
    setIsEditing(false);
    calculatePayment(); // 원래 값 복원
    setIsChecked(''); // 체크 상태 초기화
  };

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (key: string) => isEditing && setIsChecked(key);

  return (
    <div>
      {/* Drawer 컴포넌트 */}
      <ShaDrawer
        data={engineers}
        filterKeys={['name', 'phone_number', 'address']}
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
          {/* 선택된 기사의 일정 표시 */}
          <h2>{selectedData.name}님의 일정</h2>
          <div className="mb-3 ">
            <ACalendar events={events} onEventSelect={handleEventSelect} />
          </div>

          {/* Footer 정보 (총 지급액, 최종 지급액, 지급 여부 등) */}
          <AFooter
            data={selectedData}
            totalAmount={totalAmount}
            finalPayment={finalPayment}
            isEditing={isEditing}
            isChecked={isChecked}
            onFinalPaymentChange={setFinalPayment}
            onCheckboxChange={handleCheckboxChange}
            labelMap={{ ...LABEL_MAP }}
          />

          {/* 수정 및 취소 버튼 */}
          <div className="flex justify-center gap-2 mt-4">
            <ShaButton text={isEditing ? '저장' : '수정'} onClick={handleEditToggle} />
            {isEditing && <ShaButton text="취소" onClick={handleEditCancel} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
