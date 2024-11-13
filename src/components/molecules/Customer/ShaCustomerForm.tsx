'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ShaInfoForm from '../Form/ShaInfoForm';
import { ShaCustomerFormData, CustomerFormValues } from '@/data/ShaCustomerFormData';

type CustomerFormProps = {
  formValues: CustomerFormValues;
  handleFieldChange: (fieldName: keyof CustomerFormValues, value: any) => void;
  isSubmitAttempted: boolean;
};

const ShaCustomerFormMolecule = ({
  formValues,
  handleFieldChange,
  isSubmitAttempted,
}: CustomerFormProps) => {
  return (
    <Card className="w-full max-w-5xl shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-semibold">고객 정보 등록</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 px-6">
        <ShaInfoForm
          ShaTitledFormControlProps={ShaCustomerFormData(
            formValues,
            handleFieldChange,
            isSubmitAttempted
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ShaCustomerFormMolecule;
