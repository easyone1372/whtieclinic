'use client';

import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import { EngineerFormValues, ShaEngineerFormData } from '@/data/ShaEngineerFormData';
import { engineerApi } from '@/service/Engineer/EngineerRegi';
import React from 'react';

const Page = () => {
  return (
    <ShaFormTemplate<EngineerFormValues>
      title="기사 정보 등록"
      initialValues={{
        engineerName: '',
        engineerPhone: '',
        engineerAddr: '',
        skills: [],
        engineerRemark: '',
        engineerCommission: 50,
        engineerPayday: '',
        engineerHoliday: '',
        engineerDayoff: '',
      }}
      onSubmit={engineerApi.register}
      formDataGenerator={ShaEngineerFormData}
    />
  );
};
export default Page;
