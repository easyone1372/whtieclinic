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
  updateEngineerPayment,
  LABEL_MAP,
  fetchEngineerWeeklyDetail,
} from '@/service/EngineerList/EngineerList';
import ShaText from '@/components/atom/Text/ShaText';
import moment from 'moment';

export type LabelMapType = typeof LABEL_MAP;

const Page = () => {
  const [filter, setFilter] = useState('');
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [events, setEvents] = useState<CalendarEventType[]>([]);
  const [selectedData, setSelectedData] = useState<Engineer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [weeklyTotals, setWeeklyTotals] = useState<Record<string, number>>({});
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    week: '',
    amount: 0,
    isPaid: false,
  });

  //엔지니어리스트 API불러오는 함수
  useEffect(() => {
    const loadEngineers = async () => {
      try {
        const data = await fetchEngineers();
        setEngineers(data);
      } catch (error) {
        // console.error('Error loading engineers:', error);
      }
    };
    loadEngineers();
  }, []);

  // 날짜별 일급 불러오는 함수
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

          const weeklyData = events.reduce(
            (acc, event) => {
              const week = getWeekOfMonth(event.start);
              acc[week] = (acc[week] || 0) + (event.amount || 0);
              return acc;
            },
            {} as Record<string, number>
          );
          setWeeklyTotals(weeklyData);
        } catch (error) {
          // console.error('Error loading engineer events:', error);
        }
      };
      loadEngineerEvents();
    }
  }, [selectedData]);

  // 주차 계산함수
  const getWeekOfMonth = (date?: Date): string => {
    if (!date) return '날짜 없음';
    const targetDate = moment(date);
    const firstDayOfMonth = targetDate.clone().startOf('month');
    const firstWeekStart = firstDayOfMonth.clone().startOf('isoWeek');
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

      return {
        total: weeklyTotal,
        commission: commissionAmount,
      };
    },
    [events, selectedData]
  );

  // 주급 불러오는 함수
  const loadWeeklyData = useCallback(
    async (week: string, selectedDate: Date) => {
      if (!selectedData) return;

      try {
        const weeklyData = await fetchEngineerWeeklyDetail(selectedData.engineerId, week);

        // 계산된 값 가져오기
        const calculatedData = calculateTotalAndCommission(selectedDate);

        if (!weeklyData || (weeklyData.weeklyEarning === 0 && !weeklyData.isPaid)) {
          // DB에 데이터가 없는 경우 계산된 값 사용
          setTotalAmount(calculatedData.total);
          setEditData({
            week,
            amount: calculatedData.commission,
            isPaid: false,
          });
        } else {
          // DB에 데이터가 있는 경우 DB 값 사용
          setTotalAmount(calculatedData.total); // 총액은 항상 계산된 값 사용
          setEditData({
            week,
            amount: weeklyData.weeklyEarning,
            isPaid: weeklyData.isPaid,
          });
        }
      } catch (error) {
        // console.error('Error loading weekly data:', error);

        // 에러 발생 시 계산된 값 사용
        const calculatedData = calculateTotalAndCommission(selectedDate);
        setTotalAmount(calculatedData.total);
        setEditData({
          week,
          amount: calculatedData.commission,
          isPaid: false,
        });
      }
    },
    [selectedData, calculateTotalAndCommission]
  );

  // 달력 클릭하는 함수
  const handleSelectSlot = (slotInfo: { start: Date }) => {
    if (!slotInfo.start) return;
    const week = getWeekOfMonth(slotInfo.start);
    loadWeeklyData(week, slotInfo.start);
  };

  // 필터링
  const handleFilterChange = (value: string) => setFilter(value);

  const handleItemClick = (item: Engineer) => {
    setSelectedData(item);
    setIsDrawerOpen(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
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

      // 저장 후 데이터 다시 불러오기
      const date = events.find((event) => getWeekOfMonth(event.start) === editData.week)?.start;
      if (date) {
        loadWeeklyData(editData.week, date);
      }

      alert('저장이 완료되었습니다.');
    } catch (error) {
      // console.error('Error saving edit:', error);
      alert('저장에 실패했습니다.');
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
            totalAmount={totalAmount || 0}
            finalPayment={editData.amount}
            isEditing={isEditing}
            isChecked={editData.isPaid}
            onFinalPaymentChange={(value) => setEditData((prev) => ({ ...prev, amount: value }))}
            onCheckboxChange={(checked) =>
              isEditing ? setEditData((prev) => ({ ...prev, isPaid: checked })) : undefined
            }
            labelMap={{ ...LABEL_MAP }}
          />
          <div className="flex justify-center gap-2 mt-4">
            {isEditing ? (
              <>
                <ShaButton text="저장" onClick={handleSaveEdit} />
                <ShaButton text="취소" onClick={() => setIsEditing(false)} />
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
