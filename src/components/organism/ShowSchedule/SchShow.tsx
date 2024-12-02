import ShaDateSchedulePicker from '@/components/molecules/ADateTimePicker/ShaDateSchedulePicker';
import SchEngList from './SchEngList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ShaButton from '@/components/atom/Button/ShaButton';
import SchTimeLine from './SchTimeLine';
import { SchShowDisplay } from '@/constants/LJW/ShowSchTypes';
import { Engineer } from '@/constants/types/type';
import { useRouter } from 'next/navigation';
import {
  extractStartTime,
  getEngineersByDate,
  getOrdersByEngineerAndDate,
} from '@/constants/LJW/ShowSchUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// SchShow.tsx
// 스케쥴 화면 전체
const SchShow = () => {
  const [engList, setEngList] = useState<Engineer[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectEng, setSelectEng] = useState<number | null>(null);
  const [scheduleData, setScheduleData] = useState<SchShowDisplay[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const router = useRouter();

  // 날짜 변경 핸들러
  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date || new Date());
  }, []);

  // 기사 선택 핸들러
  const handleEngSelect = useCallback((engineer_id: number) => {
    setSelectEng(engineer_id);
  }, []);

  // 수정 모드 토글 핸들러
  const handleEditMode = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  // 선택된 기사 이름
  const selectedEngineerName = useMemo(() => {
    const engineer = engList.find((engineer) => engineer.engineerId === selectEng);
    return engineer ? `${engineer.engineerName}님의 일정` : '기사를 선택하세요';
  }, [engList, selectEng]);

  // 날짜 변경 시 초기화 및 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate) {
        // 날짜 변경 시 초기화
        setEngList([]);
        setSelectEng(null);
        setScheduleData([]);

        const engineers = await getEngineersByDate(selectedDate);
        setEngList(engineers);
      }
    };

    fetchData();
  }, [selectedDate]);

  // 기사 선택 시 해당 기사의 스케줄 가져오기
  useEffect(() => {
    const fetchEngineerData = async () => {
      if (selectEng && selectedDate) {
        const schedule = await getOrdersByEngineerAndDate(selectEng, selectedDate);
        setScheduleData(schedule);
      } else {
        // 기사가 선택되지 않은 경우 초기화
        setScheduleData([]);
      }
    };

    fetchEngineerData();
  }, [selectEng, selectedDate]);

  // 스케줄 수정 핸들러
  const handleRowEdit = useCallback(
    (timeSlot: string) => {
      const order = scheduleData?.find((order) => order.orderTimeslot === timeSlot);
      let queryParams: Record<string, string> = {
        selectDate: selectedDate.toISOString().split('T')[0],
        selectTime: extractStartTime(timeSlot),
        engineerId: selectEng?.toString() ?? '',
      };

      if (order) {
        queryParams = {
          selectDate: order.orderDate.toString().split('T')[0],
          selectTime: extractStartTime(order.orderTimeslot),
          orderId: order.orderId.toString(),
          engineerId: order.engineerId.toString(),
        };
      }

      const queryString = new URLSearchParams(queryParams);
      router.push(`/customer/c_modify?${queryString}`);
      console.log('handleRowEdit', queryParams);
    },
    [scheduleData, selectedDate, selectEng, router]
  );

  return (
    <div className="flex flex-row items-center justify-center min-h-screen py-12 px-4 gap-12">
      <div className="space-y-4">
        <ShaDateSchedulePicker value={selectedDate} onChange={handleDateChange} />
        <SchEngList engineerList={engList} onClick={handleEngSelect} />
      </div>
      <div className="min-w-[1250px]">
        <Card className="w-full Shadow-sm">
          <CardHeader className="border-b w-full flex flex-row justify-between">
            <CardTitle className="text-2xl font-semibold">{selectedEngineerName}</CardTitle>
            <ShaButton onClick={handleEditMode} size="sm" text="수정" />
          </CardHeader>
          <CardContent>
            <SchTimeLine
              scheduleData={selectEng ? scheduleData : []} // 기사가 선택되지 않은 경우 빈 배열 전달
              selectedDate={selectedDate}
              onEditRow={handleRowEdit}
              isEditing={isEditing}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchShow;
