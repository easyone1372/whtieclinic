'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ShaInfoForm from '@/components/molecules/Form/ShaInfoForm';
import ShaTwoButton from '@/components/molecules/Button/ShaTwoButton';
import { SalesFormData } from '@/components/organism/Customer/ShaSalesInfo';
import { ShaSalesInfoFormData } from './form';

import { EditOrderCustomerFormData, EditOrderCustomerFormValues } from '@/constants/schedule/EditOrderCustomer';
import { ShaEngTimeEditFormData, ShaEngTimeEditFormValues } from '@/constants/schedule/ShaEngTimeEdit';
import { EditOrderInfo } from './jwtype_edit';
import { fetchEngineerList } from './engineerListService';


const AEditOrderInfo = ({ selectTime, engineer_id, customer_id, order_id }: EditOrderInfo) => {
  const [formValues, setFormValues] = useState<ShaEngTimeEditFormValues>({
    reservationDateTime: selectTime || new Date(),
    engineerId: engineer_id || null,
    engineerName: '',
  });

  const [salesForm, setSalesForm] = useState<SalesFormData>({
    order_id: order_id || 0,
    product_type_id: 0,
    product_detail_id: 0,
    count: 1,
    discount_amount: 0,
    total_amount: 0,
    product_remark: '',
    remark: '',
    selectedCategory: '',
    selectedDropdownValue: '',
    itemCount: 1,
    discountAmount: 0,
    finalPrice: 0,
    uniqueDetails: '',
    customProduct: '',
    isDiscountApplied: false,
    isFinalPriceManual: false,
  });

  const [customerFormValues, setCustomerFormValues] = useState<EditOrderCustomerFormValues>({
    customerId: customer_id || 0,
    customerName: '',
    customerTel: '',
    address: '',
    uniqueDetails: '',
    document: '',
    published: false,
    payment: '',
  });

  // 기사 데이터를 저장할 상태 추가
  const [engineerList, setEngineerList] = useState<{ engineerId: number; engineerName: string }[]>([]);

  // 초기 기사 데이터 로드
  useEffect(() => {
    const loadEngineerList = async () => {
      try {
        const data = await fetchEngineerList(); // API를 통해 기사 데이터를 가져옴
        setEngineerList(data); // 실제 API 데이터로 상태 업데이트
      } catch (error) {
        console.error('Failed to load engineer list', error);
      }
    };

    loadEngineerList();
  }, []);

  const handleFieldChange = (fieldName: keyof ShaEngTimeEditFormValues, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSalesFormChange = (field: keyof SalesFormData, value: any) => {
    setSalesForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCustomerFieldChange = (fieldName: keyof EditOrderCustomerFormValues, value: any) => {
    setCustomerFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleIsChecked = () => {
    const newChecked = !customerFormValues.published;
    setCustomerFormValues((prev) => ({
      ...prev,
      published: newChecked,
    }));
  };

  return (
    <div className="flex gap-4">
      <Card className="w-[800px] shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">스케줄 수정하기</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <ShaInfoForm
            ShaTitledFormControlProps={ShaEngTimeEditFormData(formValues, handleFieldChange, engineerList)}
          />
        </CardContent>

        <CardContent className="pt-6 px-6">
          <ShaInfoForm
            ShaTitledFormControlProps={EditOrderCustomerFormData(
              customerFormValues,
              handleCustomerFieldChange,
              handleIsChecked,
              false
            )}
          />
        </CardContent>

        <CardContent>
          <ShaInfoForm
            ShaTitledFormControlProps={ShaSalesInfoFormData({
              formData: salesForm,
              onCategoryChange: (value) => handleSalesFormChange('selectedCategory', value),
              onDropdownChange: (value) => handleSalesFormChange('selectedDropdownValue', value),
              onItemCountChange: (value) => handleSalesFormChange('itemCount', Number(value)),
              onDiscountChange: (value) => handleSalesFormChange('discountAmount', Number(value)),
              onRemarkChange: (value) => handleSalesFormChange('uniqueDetails', value),
              onProductRemarkChange: (value) => handleSalesFormChange('customProduct', value),
              onDiscountToggle: (checked) => handleSalesFormChange('isDiscountApplied', checked),
              onTotalAmountChange: (value) => handleSalesFormChange('finalPrice', Number(value)),
              isSubmitAttempted: false,
            })}
          />
        </CardContent>

        <CardFooter>
          <ShaTwoButton
            leftButton={{
              text: '취소',
              onClick: () => window.history.back(),
              size: 'lg',
              variant: 'outline',
            }}
            rightButton={{
              text: '수정',
              onClick: () => console.log('Submitted'), // 수정 버튼 클릭 이벤트 설정
              size: 'lg',
              disabled: false, // 수정 필요 시 조건 추가
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default AEditOrderInfo;
