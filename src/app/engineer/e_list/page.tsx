'use client';

import { useEffect, useState, useCallback } from 'react';
import ShaDrawer from '@/components/molecules/drawer/ShaDrawer';
import ACalendar, { CalendarEventType } from '@/components/atom/Calendar/ACalendar';
import ShaButton from '@/components/atom/Button/ShaButton';
import AFooter from '@/components/organism/Footer/AFooter';
import { Engineer } from '@/constants/types/type';
import {
  fetchEngineerEvents,
  fetchEngineers,
  LABEL_MAP,
} from '@/service/EngineerList/EngineerList';
import ShaText from '@/components/atom/Text/ShaText';

export type LabelMapType = typeof LABEL_MAP;

const Page = () => {
  const [filter, setFilter] = useState(''); // 필터 입력 상태
  const [engineers, setEngineers] = useState<Engineer[]>([]); // Engineer 타입의 배열
  const [events, setEvents] = useState<CalendarEventType[]>([]); // CalendarEventType 배열
  const [selectedData, setSelectedData] = useState<Engineer | null>(null); // 선택된 엔지니어 정보
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer 열림 상태
  const [totalAmount, setTotalAmount] = useState(0); // 총 지급액
  const [finalPayment, setFinalPayment] = useState(0); // 최종 지급액
  const [isChecked, setIsChecked] = useState(false); // 지급 여부 체크 상태
  const [initialCheckedState, setInitialCheckedState] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  // 엔지니어 데이터 가져오기
  useEffect(() => {
    const loadEngineers = async () => {
      try {
        const data = await fetchEngineers();
        setEngineers(data);
      } catch (error) {
        console.error('Error loading engineers:', error);
      }
    };
    loadEngineers();
  }, []);

  // 선택된 엔지니어의 일급 데이터 가져오기
  useEffect(() => {
    if (selectedData) {
      const loadEngineerEvents = async () => {
        try {
          const data = await fetchEngineerEvents(selectedData.engineerId);
          setEvents(data);
        } catch (error) {
          console.error('Error loading engineer events:', error);
        }
      };
      loadEngineerEvents();
    }
  }, [selectedData]);

  // 총 지급액 및 최종 지급액 계산 함수
  const calculatePayment = useCallback(() => {
    const weeklyTotal = events.reduce((sum, event) => sum + (event.amount || 0), 0);
    const finalAmount = weeklyTotal * ((selectedData?.engineerCommission || 0) / 100);
    setTotalAmount(weeklyTotal);
    setFinalPayment(finalAmount);
  }, [events, selectedData]);

  // 지급액 계산을 위한 useEffect
  useEffect(() => {
    if (events.length > 0) {
      calculatePayment();
    }
  }, [events, calculatePayment]);

  // 필터 변경 핸들러
  const handleFilterChange = (value: string) => setFilter(value);

  // 기사 선택 핸들러
  const handleItemClick = (item: Engineer) => {
    setSelectedData(item);
    setIsDrawerOpen(false);
  };

  // 수정 모드 토글 핸들러
  const handleEditToggle = () => {
    if (!isEditing) {
      setInitialCheckedState(isChecked);
    }
    setIsEditing(!isEditing);
  };

  // 수정 취소 핸들러
  const handleEditCancel = () => {
    setIsEditing(false);
    calculatePayment();
    setIsChecked(initialCheckedState);
  };

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (checked: boolean) => isEditing && setIsChecked(checked);

  return (
    <div>
      <ShaDrawer
        data={engineers}
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
          <div className="pt-5 pl-5">
            <ShaText text={`${selectedData.engineerName}님의 일정`} isBold size="large" />
          </div>
          <div className="mb-3">
            <ACalendar
              events={events}
              onEventSelect={(event) => console.log('Event selected:', event)}
            />
          </div>

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
