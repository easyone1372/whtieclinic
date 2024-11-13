// molecules/Order/ShaOrderForm.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ShaInfoForm from '../Form/ShaInfoForm';
import { ShaOrderFormData, OrderFormValues } from '@/data/ShaOrderFormData';

type OrderFormProps = {
  formValues: OrderFormValues;
  handleFieldChange: (fieldName: keyof OrderFormValues, value: any) => void;
  isSubmitAttempted: boolean;
};

const ShaOrderForm = ({ formValues, handleFieldChange, isSubmitAttempted }: OrderFormProps) => {
  return (
    <Card className="w-full max-w-5xl shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-semibold">세척 정보 등록</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 px-6">
        <ShaInfoForm
          ShaTitledFormControlProps={ShaOrderFormData(
            formValues,
            handleFieldChange,
            isSubmitAttempted
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ShaOrderForm;
