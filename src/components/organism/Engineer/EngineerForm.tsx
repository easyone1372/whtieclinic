'use client';

import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import { EngineerFormValues, ShaEngineerFormData } from '@/data/ShaEngineerFormData';
import { engineerApi } from '@/service/Engineer/EngineerRegi';
import React from 'react';

const EngineerRegisterPage = () => {
  const initialValues: EngineerFormValues = {
    engineerName: '',
    engineerPhone: '',
    engineerAddr: '',
    skills: [],
    engineerRemark: '',
    engineerCommission: 50,
    engineerPayday: '',
    engineerHoliday: [],
    engineerDayoff: '',
  };
  const validationRules = [
    (formValues: EngineerFormValues) => !!formValues.engineerName,
    (formValues: EngineerFormValues) => !!formValues.engineerPhone,
    (formValues: EngineerFormValues) => !!formValues.engineerAddr,
    (formValues: EngineerFormValues) =>
      typeof formValues.engineerCommission === 'number' &&
      formValues.engineerCommission >= 0 &&
      formValues.engineerCommission <= 100,
    (formValues: EngineerFormValues) => !!formValues.skills,
    (formValues: EngineerFormValues) => !!formValues.engineerPayday,
  ];
  return (
    <ShaFormTemplate<EngineerFormValues>
      title="기사 정보 등록"
      initialValues={initialValues}
      onSubmit={engineerApi.register}
      formDataGenerator={ShaEngineerFormData}
      validationRules={validationRules}
    />
  );
};
export default EngineerRegisterPage;
