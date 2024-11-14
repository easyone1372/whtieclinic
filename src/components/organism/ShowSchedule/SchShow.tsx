import ShaDateSchedulePicker from '@/components/molecules/ADateTimePicker/ShaDateSchedulePicker';
import SchEngList from './SchEngList';
import { useEffect, useState } from 'react';
import ShaButton from '@/components/atom/Button/ShaButton';
import SchTimeLine from './SchTimeLine';
import { SchShowDisplay } from '@/constants/LJW/ShowSchTypes';
import { Engineer } from '@/constants/types/type';
import { useRouter } from 'next/navigation';
import { getEngineersByDate, getOrdersByEngineerAndDate } from '@/constants/LJW/ShowSchUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

//SchShow.tsx
//스케쥴 화면 전체
const SchShow = () => {
  const [engList, setEngList] = useState<Engineer[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectEng, setSelectEng] = useState<number | null>(null);
  const [scheduleData, setScheduleData] = useState<SchShowDisplay[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const router = useRouter();

  // 날짜 변경 시, 해당 날짜에 맞는 기사 리스트를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate) {
        const engineers = await getEngineersByDate(selectedDate);
        setEngList(engineers);
        setSelectEng(null);
        setScheduleData([]);
      }
    };

    fetchData();
  }, [selectedDate]);

  // 기사 선택 시, 해당 기사의 스케줄을 가져옴
  useEffect(() => {
    const fetchEngineerData = async () => {
      if (selectEng && selectedDate) {
        const schedule = await getOrdersByEngineerAndDate(selectEng, selectedDate);
        setScheduleData(schedule);
      }
    };
    fetchEngineerData();
  }, [selectEng, selectedDate]);

  //우상단 수정버튼 클릭시 작동 함수
  const handleEditMode = () => {
    setIsEditing(!isEditing);
  };

  //row의 수정버튼 클릭시 페이지 전환+데이터 전달 함수
  const handleRowEdit = (order: SchShowDisplay) => {
    const queryString = new URLSearchParams({
      selectTime: order.orderDate.toISOString(),
      selectCustomerId: order.customerId.toString(),
      selectOrderid: order.orderId.toString(),
      engineerId: order.engineerId.toString(),
    });

    router.push(`/customer/c_modify?${queryString}`);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date || new Date());
  };

  const selectedEngineerName =
    engList.find((engineer) => engineer.engineerId === selectEng)?.engineerName ||
    '기사를 선택하세요';

  return (
    <div className="flex flex-row items-center justify-center min-h-screen py-12 px-4 gap-12">
      <div className="space-y-4">
        <ShaDateSchedulePicker value={selectedDate} onChange={handleDateChange} />
        <SchEngList engineerList={engList} onClick={(engineer_id) => setSelectEng(engineer_id)} />
      </div>
      <div className="min-w-[1200px]">
        <Card className="w-full Shadow-sm">
          <CardHeader className="border-b w-full flex flex-row justify-between">
            <CardTitle className="text-2xl font-semibold">{selectedEngineerName}</CardTitle>
            <div>
              <ShaButton onClick={handleEditMode} size="sm" text="수정" />
            </div>
          </CardHeader>
          <CardContent>
            <SchTimeLine
              scheduleData={scheduleData}
              selectedDate={selectedDate}
              isEditing={isEditing}
              onEditOrder={handleRowEdit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchShow;
