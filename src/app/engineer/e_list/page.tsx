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
  updateEngineerPayment,
} from '@/service/EngineerList/EngineerList';
import ShaText from '@/components/atom/Text/ShaText';
import moment from 'moment';

export type LabelMapType = typeof LABEL_MAP;

const Page = () => {
  const [filter, setFilter] = useState(''); // 검색 필터 상태
  const [engineers, setEngineers] = useState<Engineer[]>([]); // 엔지니어 목록 상태
  const [events, setEvents] = useState<CalendarEventType[]>([]); // 일정 이벤트 상태
  const [selectedData, setSelectedData] = useState<Engineer | null>(null); // 선택된 엔지니어 데이터 상태
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer 열림 상태
  const [weeklyTotals, setWeeklyTotals] = useState<Record<string, number>>({}); // 주차별 합계 금액 상태
  const [totalAmount, setTotalAmount] = useState(0); // 주차별 합계금액 상태
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  const [editData, setEditData] = useState({
    week: '',
    amount: 0,
    isPaid: false,
  }); // 편집 데이터 상태

  const [initialEditData, setInitialEditData] = useState({
    week: '',
    amount: 0,
    isPaid: false,
  }); // 초기 편집 데이터 상태

  // 엔지니어 목록 가져오기
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

  // 일정 이벤트 가져오기
  useEffect(() => {
    if (selectedData) {
      const loadEngineerEvents = async () => {
        try {
          const data = await fetchEngineerEvents(selectedData.engineerId);
          const events = data.map((event) => ({
            title: `${event.dailyIncome.toLocaleString()}원`,
            start: new Date(event.date.split(' ')[0]),
            end: new Date(event.date.split(' ')[0]),
            amount: event.dailyIncome,
          }));
          setEvents(events);

          // 주차별로 그룹화하여 합계 계산
          const weeklyData = events.reduce(
            (acc, event) => {
              const week = getWeekOfMonth(event.start);
              acc[week] = (acc[week] || 0) + (event.amount || 0);
              return acc;
            },
            {} as Record<string, number>
          );

          setWeeklyTotals(weeklyData); // 주차별 합계 금액 업데이트
        } catch (error) {
          console.error('Error loading engineer events:', error);
        }
      };
      loadEngineerEvents();
    }
  }, [selectedData]);

  // **ISO 8601 기반 주차 계산 함수**
  const getWeekOfMonth = (date: Date): string => {
    const targetDate = moment(date);
    const firstDayOfMonth = targetDate.clone().startOf('month'); // 해당 월의 첫날
    const firstWeekStart = firstDayOfMonth.clone().startOf('isoWeek'); // 첫 번째 ISO 주의 시작

    const diffWeeks = targetDate.diff(firstWeekStart, 'weeks');
    return `${targetDate.format('YYYY년 M월')} ${diffWeeks + 1}주차`;
  };

  // 주차별 합계 금액 및 수당금액 계산
  const calculateTotalAndCommission = useCallback(
    (selectedDate: Date) => {
      const selectedWeek = getWeekOfMonth(selectedDate); // 선택된 주차 계산
      const weeklyTotal = events
        .filter((event) => event.start && getWeekOfMonth(event.start) === selectedWeek)
        .reduce((sum, event) => sum + (event.amount || 0), 0); // 주차별 합계 금액 계산

      // 선택된 엔지니어의 수당률 가져오기
      const commissionRate = selectedData?.engineerCommissionRate
        ? selectedData.engineerCommissionRate / 100 // 백분율 변환
        : 0;

      const commissionAmount = Math.floor(weeklyTotal * commissionRate); // 수당금액 계산

      // 상태 업데이트
      setTotalAmount(weeklyTotal); // 합계금액 업데이트
      setEditData((prev) => ({
        ...prev,
        amount: commissionAmount, // 수당금액 업데이트
      }));
    },
    [events, selectedData]
  );

  // 달력 셀 선택 핸들러
  const handleSelectSlot = (slotInfo: { start: Date }) => {
    if (!slotInfo.start) {
      return;
    }

    const selectedWeek = getWeekOfMonth(slotInfo.start); // ISO 주차 계산
    calculateTotalAndCommission(slotInfo.start); // 합계금액과 수당금액 계산

    setEditData((prev) => ({
      ...prev,
      week: `${slotInfo.start.getFullYear()}년 ${slotInfo.start.getMonth() + 1}월 ${selectedWeek}`,
    }));
  };

  const handleFilterChange = (value: string) => setFilter(value); // 검색 필터 변경

  const handleItemClick = (item: Engineer) => {
    setSelectedData(item); // 선택된 엔지니어 업데이트
    setIsDrawerOpen(false); // Drawer 닫기
  };

  const handleEditToggle = () => {
    setInitialEditData({ ...editData }); // 초기 편집 데이터 저장
    setIsEditing(!isEditing); // 수정 모드 토글
  };

  const handleEditCancel = () => {
    setEditData({ ...initialEditData }); // 초기 데이터 복원
    setIsEditing(false); // 수정 모드 종료
  };

  const handleSaveEdit = async () => {
    if (!selectedData) return;

    try {
      await updateEngineerPayment(
        selectedData.engineerId,
        editData.week,
        editData.amount,
        editData.isPaid
      );
      setIsEditing(false);

      const updatedEvents = await fetchEngineerEvents(selectedData.engineerId);
      const eventsWithDateConversion = updatedEvents.map((event) => ({
        title: `${event.dailyIncome.toLocaleString()}원`,
        start: new Date(event.date.split(' ')[0]),
        end: new Date(event.date.split(' ')[0]),
        amount: event.dailyIncome,
      }));
      setEvents(eventsWithDateConversion);

      alert('수정이 완료되었습니다!');
    } catch (error) {
      console.error('Error saving edit:', error);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
            <ACalendar events={events} onSelectSlot={handleSelectSlot} selectable={true} />
          </div>
          <AFooter
            data={selectedData}
            totalAmount={totalAmount} // 합계 금액 전달
            finalPayment={editData.amount} // 수당 금액 전달
            isEditing={isEditing}
            isChecked={editData.isPaid}
            onFinalPaymentChange={(value) => setEditData({ ...editData, amount: value })}
            onCheckboxChange={(checked) => setEditData({ ...editData, isPaid: checked })}
            labelMap={{ ...LABEL_MAP }}
          />
          <div className="flex justify-center gap-2 mt-4">
            {isEditing ? (
              <>
                <ShaButton text="저장" onClick={handleSaveEdit} />
                <ShaButton text="취소" onClick={handleEditCancel} />
              </>
            ) : (
              <ShaButton text="수정" onClick={handleEditToggle} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
