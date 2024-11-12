'use client';

import ShaTwoButton from '@/components/molecules/Button/ShaTwoButton';
import ShaInfoForm from '@/components/molecules/Form/ShaInfoForm';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShaCustomerInfoFormData } from '@/constants/ShaCustomerInfoFormData';
import React, { useState } from 'react';

export type CustomerInfoValues = {
  reservationDateTime: Date | null;
  name: string;
  phoneNumber: string;
  address: string;
  uniqueDetails: string;
  document: string;
  published: string;
  payment: string;
  isDepositPaid: boolean; // 추가
  depositAmount: number; // 추가
};

type CustomerInfoProps = {
  onRegister: () => void;
};

const ShaCustomerInfo = ({ onRegister }: CustomerInfoProps) => {
  const [formValues, setFormValues] = useState<CustomerInfoValues>({
    reservationDateTime: null,
    name: '',
    phoneNumber: '',
    address: '',
    uniqueDetails: '',
    document: '',
    published: '',
    payment: '',
    isDepositPaid: false, // 초기값 추가
    depositAmount: 0, // 초기값 추가
  });

  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  const resetFormValues = () => {
    setFormValues({
      reservationDateTime: null,
      name: '',
      phoneNumber: '',
      address: '',
      uniqueDetails: '',
      document: '',
      published: '',
      payment: '',
      isDepositPaid: false, // 리셋 시 초기화
      depositAmount: 0, // 리셋 시 초기화
    });
    setIsSubmitAttempted(false);
    setResetCounter((prev) => prev + 1);
  };

  const handleFieldChange = (fieldName: keyof CustomerInfoValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
      // 계약금 체크박스가 해제되면 금액도 0으로 초기화
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

  const handleSubmit = () => {
    setIsSubmitAttempted(true);
    if (isFormValid()) {
      console.log('등록된 데이터:', {
        ...formValues,
        계약금입금여부: formValues.isDepositPaid,
        계약금액: formValues.depositAmount,
      });
      onRegister();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">고객 정보 등록</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <ShaInfoForm
            key={resetCounter}
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

export default ShaCustomerInfo;
