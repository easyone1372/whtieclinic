'use client';

import ShaTwoButton from '@/components/molecules/Button/ShaTwoButton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import ShaTitledFormControl from '@/components/molecules/Form/ShaTitledFormControl';
import {
  EngineerInfo,
  OrderInfo,
  ShaScheduleResFormData,
  ShaScheduleResFormValues,
} from '@/constants/schedule/ShaScheduleResForm';

//예약 정보 등록하기 컴포넌트

//!!아직 코드 안나눔 + 리팩토링 안함!!

// 보여질 예약 주문 정보 타입 정의
type Order = {
  id: number;
  details: string;
  startTime: string;
  endTime: string;
  engineerId: number | null;
};

// 엔지니어 정보 타입 정의
type Engineer = {
  id: number;
  name: string;
  isHoliday: boolean;
  availability: boolean;
  orders: { id: number; startTime: string; endTime: string }[];
};

//임의로 더미데이터 집어넣어서 테스트함. api로 변경 예정
const fetchOrderData = async (selectedDate: Date): Promise<OrderInfo[]> => {
  const response = await fetch(`/api/orders?date=${selectedDate.toISOString()}`); // 서버에 날짜 기준으로 데이터 요청
  const data = await response.json();

  if (!Array.isArray(data)) {
    console.error('Expected data to be an array, but received:', data);
    return [];
  }

  return data
    .filter((order: any) => !order.engineerId) // 엔지니어가 아직 할당되지 않은 주문만 반환
    .map((order: any) => ({
      id: Number(order.id), // id가 문자열이면 Number로 변환
      name: order.name,
      phoneNumber: order.phoneNumber,
      address: order.address,
      orderUniqueDetails: order.orderUniqueDetails,
      details: order.details,
      startTime: order.startTime,
      endTime: order.endTime,
      engineerId: order.engineerId ? order.engineerId : null, // engineerId가 있을 경우 변환
    }));
};

// 서버에서 엔지니어 데이터를 불러오는 함수로 수정
const fetchEngineerData = async (
  selectedDate: Date,
  selectedOrderId: number
): Promise<EngineerInfo[]> => {
  const response = await fetch(
    `/api/engineers?date=${selectedDate.toISOString()}&orderId=${selectedOrderId}`
  );
  const data = await response.json();
  const selectedOrder = data.orders.find((order: Order) => order.id === selectedOrderId);
  if (!selectedOrder) return [];

  return data
    .filter(
      (engineer: any) => !engineer.isHoliday && !engineerHasOrderAtTime(engineer, selectedOrder)
    )
    .map((engineer: any) => ({
      id: Number(engineer.id), // id가 문자열일 경우 변환
      name: engineer.name,
      phoneNumber: engineer.phoneNumber,
      Items: engineer.Items,
      specialNotes: engineer.specialNotes,
      availability: engineer.availability,
      orders: engineer.orders.map((order: any) => ({
        id: Number(order.id), // order id가 문자열일 경우 변환
        startTime: order.startTime,
        endTime: order.endTime,
      })),
    }));
};

const engineerHasOrderAtTime = (engineer: Engineer, selectedOrder: Order) => {
  const orderStartTime = new Date(selectedOrder.startTime);
  const orderEndTime = new Date(selectedOrder.endTime);

  return engineer.orders.some((order) => {
    const engineerOrderStartTime = new Date(order.startTime);
    const engineerOrderEndTime = new Date(order.endTime);

    return (
      (orderStartTime >= engineerOrderStartTime && orderStartTime <= engineerOrderEndTime) ||
      (orderEndTime >= engineerOrderStartTime && orderEndTime <= engineerOrderEndTime)
    );
  });
};

//컴포넌트
const ShaScheduleRes = () => {
  const [formValues, setFormValues] = useState<ShaScheduleResFormValues>({
    reservationDateTime: null,
    customerName: '',
    selectedOrder: '',
    engineerName: '',
  });

  const [orderOptions, setOrderOptions] = useState<OrderInfo[]>([]);
  const [engineerOptions, setEngineerOptions] = useState<EngineerInfo[]>([]);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  useEffect(() => {
    if (formValues.reservationDateTime) {
      fetchOrderData(formValues.reservationDateTime).then((orders) => {
        const filteredOrders = orders.filter((order) => !order.engineerId);
        setOrderOptions(filteredOrders);
      });
    }
  }, [formValues.reservationDateTime]);

  useEffect(() => {
    if (formValues.reservationDateTime && formValues.selectedOrder) {
      fetchEngineerData(formValues.reservationDateTime, Number(formValues.selectedOrder)).then(
        (engineers) => {
          setEngineerOptions(engineers);
        }
      );
    }
  }, [formValues.reservationDateTime, formValues.selectedOrder]);

  const handleFieldChange = (fieldName: keyof ShaScheduleResFormValues, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const resetFormValues = () => {
    setFormValues({
      reservationDateTime: null,
      customerName: '',
      selectedOrder: '',
      engineerName: '',
    });
    setOrderOptions([]);
    setEngineerOptions([]);
    setIsSubmitAttempted(false);
  };

  const isFormValid = () => {
    return formValues.selectedOrder !== '' && formValues.engineerName !== '';
  };

  const handleSubmit = () => {
    setIsSubmitAttempted(true);
    if (isFormValid()) {
      console.log('등록된 정보:', formValues);
      resetFormValues();
    }
  };

  const formData = ShaScheduleResFormData(
    formValues,
    handleFieldChange,
    orderOptions,
    engineerOptions,
    isSubmitAttempted
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">스케쥴 등록</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <div className="flex flex-col gap-7">
            {formData.map((formField, index) => (
              <ShaTitledFormControl key={index} {...formField} />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center space-x-4 pt-6 border-t bg-muted/50">
          <ShaTwoButton
            leftButton={{
              text: '취소',
              onClick: resetFormValues,
              size: 'lg',
              variant: 'outline',
            }}
            rightButton={{
              text: '등록',
              onClick: handleSubmit,
              disabled: !isFormValid(),
              size: 'lg',
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShaScheduleRes;
