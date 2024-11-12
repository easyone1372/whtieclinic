// src/components/ShaScheduleShowTable.tsx
import React, { useState, useEffect } from 'react';
import ShaDateSchedulePicker from '@/components/molecules/ADateTimePicker/ShaDateSchedulePicker';
import ShaEngineerList from './ShaEngineerList';
import ShaScheduleTimeline from '../../../constants/jwType/ShaScheduleTimeline';


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ShaButton from '@/components/atom/Button/ShaButton';
import { useRouter } from 'next/navigation';
import {
  ScheduleDisplayOrder,
  SimplifiedOrder,
  UnifiedEngineer,
} from '@/constants/jwType/jwtype_edit';
import { Engineer } from '@/constants/jwType/jwtype';
import { getEngineersByDate, getOrdersByEngineerAndDate } from '@/ScheduleUtils/ScheduleShowUtil';

// Engineer -> UnifiedEngineer 변환 함수
const convertToUnifiedEngineer = (engineers: Engineer[]): UnifiedEngineer[] => {
  return engineers.map((engineer) => ({
    engineerId: engineer.engineer_id,
    engineerName: engineer.name,
    phoneNumber: engineer.phone_number,
    residenceArea: engineer.location,
    Items: [],
    ItemsSpecialNotes: engineer.remark || '',
    allowanceRate: '',
    paymentDay: '',
    holidayRegistration: engineer.holidays.map((holiday) => holiday.holiday),
    regularHoliday: engineer.dayoffs.map((dayoff) => dayoff.weekday_id.toString()),
  }));
};

// Order -> ScheduleDisplayOrder 변환 함수
const convertOrderToScheduleDisplayOrder = (order: SimplifiedOrder): ScheduleDisplayOrder => {
  return {
    OrderId: order.orderId,
    EngineerId: order.engineerId,
    StartTime: order.startTime,
    EndTime: order.endTime,
    CustomerName: order.customerName || '알 수 없음',
    Address: order.address || '알 수 없음',
    PhoneNumber: order.phoneNumber || '알 수 없음',
    ProductType: order.product || '기본 상품 유형',
    ProductCount: order.itemCount || 1,
    Price: order.finalPrice || 0,
    Remarks: order.specialNotes || '',
    CustomerId: order.customerId,
    Product: order.product || '기본 제품 이름',
    ItemCount: order.itemCount || 1,
    FinalPrice: order.finalPrice || 0,
    CustomerUniqueDetails: order.orderUniqueDetails || '',
  };
};

const ShaScheduleShowTable = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [engineerList, setEngineerList] = useState<UnifiedEngineer[]>([]);
  const [selectedEngineer, setSelectedEngineer] = useState<number | null>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleDisplayOrder[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  // 날짜 변경 시, 해당 날짜에 맞는 기사 리스트를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate) {
        const engineers = await getEngineersByDate(selectedDate);
        const unifiedEngineers = convertToUnifiedEngineer(engineers);
        setEngineerList(unifiedEngineers);
        setSelectedEngineer(null);
        setScheduleData([]);
      }
    };

    fetchData();
  }, [selectedDate]);

  // 기사 선택 시, 해당 기사의 스케줄을 가져옴
  useEffect(() => {
    const fetchEngineerData = async () => {
      if (selectedEngineer && selectedDate) {
        // getOrdersByEngineerAndDate의 반환 타입이 ScheduleDisplayOrder[]라면, as SimplifiedOrder[]을 제거합니다.
        const schedule = await getOrdersByEngineerAndDate(selectedEngineer, selectedDate); // 타입 단언 제거
        setScheduleData(schedule);
      }
    };
    fetchEngineerData();
  }, [selectedEngineer, selectedDate]);

  const selectedEngineerName =
    engineerList.find((engineer) => engineer.engineerId === selectedEngineer)?.engineerName ||
    '기사를 선택하세요';

  const handleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleRowEdit = (order: ScheduleDisplayOrder) => {
    const queryString = new URLSearchParams({
      selectTime: order.StartTime.toISOString(),
      selectCustomerId: order.CustomerId.toString(),
      selectOrderId: order.OrderId.toString(),
      engineerId: order.EngineerId.toString(),
    }).toString();

    router.push(`/schedule/s_modify?${queryString}`);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date || new Date());
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen py-12 px-4 gap-12">
      <div className="flex flex-col gap-2">
        <ShaDateSchedulePicker value={selectedDate} onChange={handleDateChange} />
        <ShaEngineerList
          engineerList={engineerList}
          onClick={(engineerId) => setSelectedEngineer(engineerId)}
        />
      </div>

      <div className="min-w-[1200px]">
        <Card className="w-full shadow-sm">
          <CardHeader className="border-b w-full flex flex-row justify-between">
            <CardTitle className="text-2xl font-semibold">{selectedEngineerName}</CardTitle>
            <div className="flex flex-row gap-1">
              <ShaButton onClick={handleEditMode} size="sm" text="수정" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-6">
            <ShaScheduleTimeline
              scheduleData={scheduleData}
              onEditOrder={handleRowEdit}
              isEditing={isEditing}
              selectedDate={selectedDate}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShaScheduleShowTable;
