'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ShaInfoForm from '../Form/ShaInfoForm';
import { EngineerFormData, EngineerFormValues } from '@/constants/ShaEngineerForm';
import ShaTwoButton from '../Button/ShaTwoButton';
import axios from 'axios';
import { DayNameEnum, RateEnum } from '@/constants/types/LHH/EngineerRegisterType';

type RegisterProps = {
  onRegister?: () => void;
};

const ShaRegister = ({ onRegister }: RegisterProps) => {
  const [formValues, setFormValues] = useState<EngineerFormValues>({
    name: '',
    phoneNumber: '',
    location: '', // residenceArea → location
    skills: [], // Items → skills
    skillRemark: '', // ItemsSpecialNotes → skillRemark
    remark: '', // specialNotes → remark
    commissionRate: '50%' as RateEnum, // allowanceRate → commissionRate
    paymentDay: '월요일' as DayNameEnum, // paymentDay (타입만 변경)
    specialHolidays: [], // holidayRegistration → specialHolidays
    regularHolidays: [], // regularHoliday → regularHolidays
  });

  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const resetFormValues = () => {
    setFormValues({
      name: '',
      phoneNumber: '',
      location: '',
      skills: [],
      skillRemark: '',
      remark: '',
      commissionRate: '50%' as RateEnum,
      paymentDay: '월요일' as DayNameEnum,
      specialHolidays: [],
      regularHolidays: [],
    });
    setIsSubmitAttempted(false);
  };

  const handleFieldChange = (fieldName: keyof EngineerFormValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const isFormValid = () => {
    const requiredFields: (keyof EngineerFormValues)[] = [
      'name',
      'phoneNumber',
      'location',
      'commissionRate',
      'paymentDay',
    ];
    return requiredFields.every((field) => formValues[field] !== '');
  };

  const registerEngineer = async (data: EngineerFormValues) => {
    try {
      const requestData = {
        engineerName: data.name,
        phoneNumber: data.phoneNumber,
        location: data.location,
        skills: data.skills, // 배열을 그대로 전달
        skillRemark: data.skillRemark,
        remark: data.remark,
        commissionRate: data.commissionRate,
        paymentDay: data.paymentDay,
        specialHolidays: data.specialHolidays, // Date[] 타입
        regularHolidays: data.regularHolidays, // DayNameEnum[] 타입
      };

      const response = await axios.post('/api/registration/engineer', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Engineer registration failed:', error);
      throw error;
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitAttempted(true);
    if (isFormValid()) {
      setIsLoading(true);
      setError(null);
      try {
        await registerEngineer(formValues);
        console.log('기사 정보가 성공적으로 등록되었습니다.');
        if (onRegister) {
          onRegister();
        }
        resetFormValues();
      } catch (error) {
        setError('등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">기사 정보 등록</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <ShaInfoForm
            ShaTitledFormControlProps={EngineerFormData(
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
              disabled: isLoading,
            }}
            rightButton={{
              text: '등록',
              onClick: handleSubmit,
              disabled: !isFormValid() || isLoading,
              size: 'lg',
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShaRegister;
