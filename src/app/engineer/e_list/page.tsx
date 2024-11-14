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
import moment from 'moment';

export type LabelMapType = typeof LABEL_MAP;

const Page = () => {
  // 상태 설정
  const [filter, setFilter] = useState(''); // 필터 입력 상태
  const [engineers, setEngineers] = useState<Engineer[]>([]); // 엔지니어 목록 배열
  const [events, setEvents] = useState<CalendarEventType[]>([]); // 일정 이벤트 배열
  const [selectedData, setSelectedData] = useState<Engineer | null>(null); // 선택된 엔지니어 정보
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer 열림 상태
  const [totalAmount, setTotalAmount] = useState(0); // 총 지급액 (주차별 금액 합계)
  const [finalPayment, setFinalPayment] = useState(0); // 최종 지급액
  const [isChecked, setIsChecked] = useState(false); // 지급 여부 체크 상태
  const [initialCheckedState, setInitialCheckedState] = useState(false); // 체크 상태 초기값
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  // 페이지 로드 시 엔지니어 데이터 가져오기
  useEffect(() => {
    const loadEngineers = async () => {
      try {
        const data = await fetchEngineers(); // API를 통해 엔지니어 목록 가져오기
        setEngineers(data); // 상태에 엔지니어 목록 설정
      } catch (error) {
        console.error('Error loading engineers:', error);
      }
    };
    loadEngineers();
  }, []);

  // 선택된 엔지니어의 일정 데이터 가져오기
  useEffect(() => {
    if (selectedData) {
      // 엔지니어가 선택된 경우
      const loadEngineerEvents = async () => {
        try {
          const data = await fetchEngineerEvents(selectedData.engineerId); // API를 통해 해당 엔지니어의 일정 가져오기
          setEvents(data); // 상태에 일정 이벤트 설정
        } catch (error) {
          console.error('Error loading engineer events:', error);
        }
      };
      loadEngineerEvents();
    }
  }, [selectedData]);

  // 주차를 계산하는 함수
  const getWeekOfMonth = (date: Date) => {
    const startOfMonth = moment(date).startOf('month'); // 해당 달의 시작 날짜 가져오기
    return Math.ceil(moment(date).diff(startOfMonth, 'days') / 7) + 1; // 주차 계산하여 반환
  };

  // 특정 주차의 totalAmount를 계산하는 함수
  const calculateTotalAmountForWeek = useCallback(
    (selectedDate: Date) => {
      const selectedWeek = getWeekOfMonth(selectedDate);

      // 이벤트 배열에서 해당 주차에 속하는 이벤트들의 금액을 합산
      const weeklyTotal = events
        .filter((event) => event.start && getWeekOfMonth(new Date(event.start)) === selectedWeek) // `event.start`가 존재하는지 확인
        .reduce((sum, event) => sum + (event.amount || 0), 0);

      setTotalAmount(weeklyTotal); // 주차별 총 금액 설정
    },
    [events]
  );

  // 달력에서 셀 클릭 시 실행되는 핸들러
  const handleSelectSlot = (slotInfo: { start: Date }) => {
    calculateTotalAmountForWeek(slotInfo.start); // 클릭한 셀의 날짜에 해당하는 주차 금액 계산
  };

  // 필터 변경 핸들러
  const handleFilterChange = (value: string) => setFilter(value);

  // 엔지니어 선택 핸들러
  const handleItemClick = (item: Engineer) => {
    setSelectedData(item); // 선택된 엔지니어 데이터 설정
    setIsDrawerOpen(false); // Drawer 닫기
  };

  // 수정 모드 토글 핸들러
  const handleEditToggle = () => {
    if (!isEditing) {
      setInitialCheckedState(isChecked); // 수정 모드 진입 전 체크 상태 저장
    }
    setIsEditing(!isEditing); // 수정 모드 상태 토글
  };

  // 수정 취소 핸들러
  const handleEditCancel = () => {
    setIsEditing(false); // 수정 모드 종료
    setIsChecked(initialCheckedState); // 체크 상태 초기값으로 복원
  };

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (checked: boolean) => isEditing && setIsChecked(checked);

  return (
    <div>
      {/* Drawer 컴포넌트 */}
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

      {/* 선택된 엔지니어가 있을 때 일정과 상세 정보 표시 */}
      {selectedData && (
        <div>
          {/* 선택된 엔지니어 이름 */}
          <div className="pt-5 pl-5">
            <ShaText text={`${selectedData.engineerName}님의 일정`} isBold size="large" />
          </div>

          {/* 달력 컴포넌트 */}
          <div className="mb-3">
            <ACalendar
              events={events} // 일정 이벤트 배열
              onEventSelect={(event) => console.log('Event selected:', event)} // 이벤트 선택 핸들러
              onSelectSlot={handleSelectSlot} // 셀 클릭 핸들러
              selectable={true} // 셀 클릭 가능하게 설정
            />
          </div>

          {/* Footer 컴포넌트 - 엔지니어 상세 정보 및 지급 정보 */}
          <AFooter
            data={selectedData} // 선택된 엔지니어 데이터
            totalAmount={totalAmount} // 주차별 총 금액
            finalPayment={finalPayment} // 최종 지급액
            isEditing={isEditing} // 수정 모드 상태
            isChecked={isChecked} // 체크박스 상태
            onFinalPaymentChange={setFinalPayment} // 최종 지급액 변경 함수
            onCheckboxChange={handleCheckboxChange} // 체크박스 상태 변경 함수
            labelMap={{ ...LABEL_MAP }} // 레이블 매핑
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
