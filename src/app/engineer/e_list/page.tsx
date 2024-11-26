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
  const [totalAmount, setTotalAmount] = useState(0); // 주차별 합계 금액 상태
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  const [editData, setEditData] = useState({
    week: '', // 주차 데이터
    amount: 0, // 수당 금액
    isPaid: false, // 지급 여부
  });

  const [initialEditData, setInitialEditData] = useState({
    week: '',
    amount: 0,
    isPaid: false,
  });

  // 엔지니어 목록 가져오기
  useEffect(() => {
    const loadEngineers = async () => {
      try {
        const data = await fetchEngineers();
        setEngineers(data); // 엔지니어 목록 상태 업데이트
      } catch (error) {
        console.error('Error loading engineers:', error);
      }
    };
    loadEngineers();
  }, []);

  // 특정 엔지니어 일정 이벤트 가져오기
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

          // 주차별 합계 계산
          const weeklyData = events.reduce((acc, event) => {
            const week = getWeekOfMonth(event.start);
            acc[week] = (acc[week] || 0) + (event.amount || 0);
            return acc;
          }, {} as Record<string, number>);
          setWeeklyTotals(weeklyData);
        } catch (error) {
          console.error('Error loading engineer events:', error);
        }
      };
      loadEngineerEvents();
    }
  }, [selectedData]);

  // ISO 주차 계산 함수
  const getWeekOfMonth = (date: Date): string => {
    const targetDate = moment(date);
    const firstDayOfMonth = targetDate.clone().startOf('month'); // 해당 월의 첫날
    const firstWeekStart = firstDayOfMonth.clone().startOf('isoWeek'); // 첫 ISO 주의 시작
    const diffWeeks = targetDate.diff(firstWeekStart, 'weeks');
    return `${targetDate.format('YYYY년 M월')} ${diffWeeks + 1}주차`;
  };

  // 주차별 합계 금액 및 수당 금액 계산
  const calculateTotalAndCommission = useCallback(
    (selectedDate: Date) => {
      const selectedWeek = getWeekOfMonth(selectedDate);
      const weeklyTotal = events
        .filter((event) => event.start && getWeekOfMonth(event.start) === selectedWeek)
        .reduce((sum, event) => sum + (event.amount || 0), 0);
      const commissionRate = selectedData?.engineerCommissionRate
        ? selectedData.engineerCommissionRate / 100
        : 0;
      const commissionAmount = Math.floor(weeklyTotal * commissionRate);
      setTotalAmount(weeklyTotal);
      setEditData((prev) => ({
        ...prev,
        amount: commissionAmount,
      }));
    },
    [events, selectedData]
  );

  // 달력 셀 선택 핸들러
  const handleSelectSlot = (slotInfo: { start: Date }) => {
    if (!slotInfo.start) return;
    calculateTotalAndCommission(slotInfo.start);
    setEditData((prev) => ({
      ...prev,
      week: getWeekOfMonth(slotInfo.start),
    }));
  };

  const handleFilterChange = (value: string) => setFilter(value);

  const handleItemClick = (item: Engineer) => {
    setSelectedData(item);
    setIsDrawerOpen(false);
  };

  const handleEditToggle = () => {
    setInitialEditData({ ...editData });
    setIsEditing(!isEditing);
  };

  const handleEditCancel = () => {
    setEditData({ ...initialEditData });
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!selectedData) return;

    try {
      // 서버로 편집 데이터 전송
      await updateEngineerPayment(
        selectedData.engineerId,
        editData.week, // 주차 정보
        editData.amount, // 수당 금액
        editData.isPaid // 지급 여부
      );
      setIsEditing(false);

      // 업데이트된 이벤트 다시 로드
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
      alert('수정에 실패했습니다.');
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
            totalAmount={totalAmount}
            finalPayment={editData.amount}
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
