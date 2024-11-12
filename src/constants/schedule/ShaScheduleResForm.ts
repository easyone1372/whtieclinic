import { useState } from 'react';
import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaDateSchedulePickerProps } from '@/components/molecules/ADateTimePicker/ShaDateSchedulePicker';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';

// 스케줄 등록 폼에서 사용하는 값의 타입 정의
export type ShaScheduleResFormValues = {
  reservationDateTime: Date | null; // 예약 날짜와 시간
  customerName: string; // 고객 이름
  selectedOrder: string; // 선택된 주문 정보
  engineerName: string; // 선택된 기사 이름
};

// 서버로부터 받은 주문 정보와 기사 정보를 담을 타입
export type OrderInfo = {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  orderUniqueDetails: string;
  startTime: string;
  endTime: string;
  engineerId?: number | null;
};

export type EngineerInfo = {
  id: number;
  name: string;
  phoneNumber: string;
  Items: string[];
  engSpecialNotes: string;
  availability: boolean;
  orders: { startTime: string; endTime: string }[];
};

// 폼 데이터를 반환하는 함수
export const ShaScheduleResFormData = (
  formValues: ShaScheduleResFormValues,
  handleFieldChange: (fieldName: keyof ShaScheduleResFormValues, value: any) => void,
  orderOptions: OrderInfo[],
  engineerOptions: EngineerInfo[],
  isSubmitAttempted: boolean
): ShaTitledFormControlProps[] => {
  const selectedOrderInfo = orderOptions.find(
    (order) => order.id === Number(formValues.selectedOrder)
  );
  const selectedEngineerInfo = engineerOptions.find(
    (engineer) => engineer.id === Number(formValues.engineerName)
  );

  return [
    {
      titleprops: {
        text: '예약일시',
      },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaDateSchedulePicker' as ShaFormFieldType,
            prevprops: {
              dateLabel: '예약 날짜',
              value: formValues.reservationDateTime,
              onChange: (newValue: Date | null) =>
                handleFieldChange('reservationDateTime', newValue),
            } as ShaDateSchedulePickerProps,
          },
        ],
      },
    },
    {
      titleprops: {
        text: '주문 정보',
      },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaDropdown' as ShaFormFieldType,
            prevprops: {
              label: '주문 선택',
              width: 'medium',
              options: orderOptions
                .filter((order) => !order.engineerId) // 등록된 기사가 없는 주문만 표시
                .map((order) => ({
                  value: order.name,
                  text: order.name,
                })),
              value: formValues.selectedOrder,
              required: true,
              error: '주문을 선택해주세요',
              onChange: (value: string) => handleFieldChange('selectedOrder', value),
              showError: isSubmitAttempted,
            } as ShaDropdownProps,
          },
        ],
      },
    },
    {
      titleprops: {
        text: '선택한 주문 정보',
      },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaTextarea' as ShaFormFieldType,
            prevprops: {
              size: 'large',
              placeholder: '선택한 주문 정보가 여기에 표시됩니다',
              value: selectedOrderInfo
                ? `${selectedOrderInfo.name}, ${selectedOrderInfo.phoneNumber}, ${
                    selectedOrderInfo.address
                  }, ${selectedOrderInfo.orderUniqueDetails}, ${new Date(
                    selectedOrderInfo.startTime
                  ).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} `
                : '',
              disabled: true,
            } as ShaTextareaProps,
          },
        ],
      },
    },
    {
      titleprops: {
        text: '기사 정보',
      },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaDropdown' as ShaFormFieldType,
            prevprops: {
              label: '기사 선택',
              width: 'medium',
              options: engineerOptions
                .filter(
                  (engineer) =>
                    engineer.availability && !engineerHasOrderAtTime(engineer, selectedOrderInfo)
                )
                .map((engineer) => ({
                  value: engineer.name,
                  text: engineer.name,
                })),
              value: formValues.engineerName,
              required: true,
              error: '기사를 선택해주세요',
              onChange: (value: string) => handleFieldChange('engineerName', value),
              showError: isSubmitAttempted,
            } as ShaDropdownProps,
          },
        ],
      },
    },
    {
      titleprops: {
        text: '선택한 기사 정보',
      },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaTextarea' as ShaFormFieldType,
            prevprops: {
              size: 'large',
              placeholder: '선택한 기사 정보가 여기에 표시됩니다',
              value: selectedEngineerInfo
                ? `${selectedEngineerInfo.name}, ${
                    selectedEngineerInfo.phoneNumber
                  }, ${selectedEngineerInfo.Items.join(', ')}, ${
                    selectedEngineerInfo.engSpecialNotes
                  }`
                : '',
              disabled: true,
            } as ShaTextareaProps,
          },
        ],
      },
    },
  ];
};

// 엔지니어가 선택된 주문의 시간대에 예약이 있는지 확인하는 함수
const engineerHasOrderAtTime = (engineer: EngineerInfo, selectedOrderInfo?: OrderInfo) => {
  if (!selectedOrderInfo) return false;

  const orderStartTime = new Date(selectedOrderInfo.startTime);
  const orderEndTime = new Date(selectedOrderInfo.endTime);

  return engineer.orders.some((order) => {
    const engineerOrderStartTime = new Date(order.startTime);
    const engineerOrderEndTime = new Date(order.endTime);

    return (
      (orderStartTime >= engineerOrderStartTime && orderStartTime <= engineerOrderEndTime) ||
      (orderEndTime >= engineerOrderStartTime && orderEndTime <= engineerOrderEndTime)
    );
  });
};
