'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ShaInfoForm from '@/components/molecules/Form/ShaInfoForm';
import { ShaCustomerInfoFormData } from '@/constants/ShaCustomerInfoFormData';
import ShaTwoButton from '@/components/molecules/Button/ShaTwoButton';
import { Loader2 } from 'lucide-react';

export type CustomerInfoValues = {
  reservationDateTime: Date | null;
  name: string;
  phoneNumber: string;
  address: string;
  uniqueDetails: string;
  document: string;
  published: string;
  payment: string;
  isDepositPaid: boolean;
  depositAmount: number;
};

// 더미 데이터
const customerDummyData: CustomerInfoValues = {
  reservationDateTime: new Date('2024-02-15T14:30:00'),
  name: '홍길동',
  phoneNumber: '010-1234-5678',
  address: '서울시 강남구 테헤란로 123',
  uniqueDetails: '주차장 지하 1층 이용 가능',
  payment: '카드',
  document: '현금영수증',
  published: '발행완료',
  isDepositPaid: true,
  depositAmount: 50000,
};

const CustomerModify = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState<CustomerInfoValues>({
    reservationDateTime: null,
    name: '',
    phoneNumber: '',
    address: '',
    uniqueDetails: '',
    document: '',
    published: '',
    payment: '',
    isDepositPaid: false,
    depositAmount: 0,
  });

  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFormValues(customerDummyData);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFieldChange = (fieldName: keyof CustomerInfoValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
      ...(fieldName === 'isDepositPaid' && !value ? { depositAmount: 0 } : {}),
    }));
  };

  const isFormValid = () => {
    const requiredFields: (keyof CustomerInfoValues)[] = [
      'reservationDateTime',
      'name',
      'phoneNumber',
      'address',
      'document',
      'payment',
      'published',
    ];
    return requiredFields.every((field) => formValues[field] !== '' && formValues[field] !== null);
  };

  const handleSubmit = async () => {
    setIsSubmitAttempted(true);
    if (isFormValid()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('수정된 정보:', {
          예약일시: formValues.reservationDateTime,
          고객성함: formValues.name,
          연락처: formValues.phoneNumber,
          주소: formValues.address,
          특이사항: formValues.uniqueDetails,
          결제방식: formValues.payment,
          증빙서류: formValues.document,
          발행여부: formValues.published,
          계약금입금여부: formValues.isDepositPaid,
          계약금: formValues.depositAmount,
        });
        window.history.back();
      } catch (error) {
        console.error('수정 실패:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">고객 정보 수정</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <ShaInfoForm
            ShaTitledFormControlProps={ShaCustomerInfoFormData(
              formValues,
              handleFieldChange,
              isSubmitAttempted
            )}
          />
        </CardContent>

        <CardFooter className="flex justify-center space-x-4 pt-6 border-t bg-muted/50">
          <ShaTwoButton
            leftButton={{
              text: '취소',
              onClick: () => window.history.back(),
              size: 'lg',
              variant: 'outline',
            }}
            rightButton={{
              text: '수정',
              onClick: handleSubmit,
              size: 'lg',
              disabled: !isFormValid(),
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerModify;
