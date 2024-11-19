'use client';

import React from 'react';
import { useFormSubmit } from '@/service/FormSubmit/FormSubmit';
import ShaCard from '@/components/atom/CardContent/ShaCard';
import ShaInfoForm from '@/components/molecules/Form/ShaInfoForm';
import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';

/**
 * 폼 템플릿 Props 타입 정의
 * @template T - 폼 데이터의 타입
 * @property {string} title - 폼의 제목
 * @property {T} initialValues - 폼 필드들의 초기값
 * @property {function} onSubmit - 폼 제출 시 호출될 API 함수
 * @property {function} onSuccess - 폼 제출 성공 시 실행될 콜백 함수 (optional)
 * @property {function} formDataGenerator - 폼 필드 구성을 생성하는 함수
 */
type FormTemplateProps<T> = {
  title: string;
  initialValues: T;
  onSubmit: (data: T) => Promise<any>;
  onSuccess?: () => void;
  formDataGenerator: (
    formValues: T,
    handleFieldChange: (fieldName: keyof T, value: any) => void,
    isSubmitAttempted: boolean
  ) => ShaTitledFormControlProps[];
  validationRules?: ((formValues: T) => boolean)[];
  twoColumns?: boolean;
};

const EnhancedFormTemplate = <T extends object>({
  title,
  initialValues,
  onSubmit,
  onSuccess,
  formDataGenerator,
  validationRules = [],
  twoColumns = false,
}: FormTemplateProps<T>) => {
  const {
    formValues,
    isSubmitAttempted,
    isLoading,
    error,
    handleFieldChange,
    handleSubmit,
    resetFormValues,
  } = useFormSubmit<T>({
    initialValues,
    onSubmit,
    onSuccess,
    validateForm: (formValues) => validationRules.every((rule) => rule(formValues)),
  });

  const isValid = validationRules.every((rule) => rule(formValues));

  return (
    <ShaCard
      title={title}
      onSubmit={handleSubmit}
      onReset={resetFormValues}
      isValid={isValid}
      isLoading={isLoading}
    >
      <ShaInfoForm
        ShaTitledFormControlProps={formDataGenerator(
          formValues,
          handleFieldChange,
          isSubmitAttempted
        )}
        twoColumns={twoColumns}
      />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </ShaCard>
  );
};

export default EnhancedFormTemplate;

/**
 * 사용 예시
 *
 * 1. 엔지니어 등록 페이지
 
 * const EngineerRegisterPage = () => {
 *   return (
 *     <ShaFormTemplate<EngineerFormValues>
 *       title="기사 정보 등록"
 *       initialValues={{
 *         engineerName: '',
 *         engineerPhone: '',
 *         engineerAddr: '',
 *         skills: [],
 *         engineerRemark: '',
 *         engineerCommission: 50,
 *         engineerPayday: '',
 *         engineerHoliday: '',
 *         engineerDayoff: '',
 *       }}
 *       onSubmit={engineerApi.register}
 *       formDataGenerator={ShaEngineerFormData}
 *     />
 *   );
 * };
 *
 * export default EngineerRegisterPage;
 * ```
 *
 * 2. 주문 등록 페이지
 
 * const OrderRegisterPage = () => {
 *   return (
 *     <ShaFormTemplate<OrderFormValues>
 *       title="세척 정보 등록"
 *       initialValues={{
 *         orderCategory: '',
 *         orderProduct: '',
 *         orderTotalAmount: 0,
 *         orderCount: 1,
 *         orderIsDiscount: false,
 *         orderDiscountRatio: 0,
 *         orderRemark: '',
 *       }}
 *       onSubmit={orderApi.register}
 *       formDataGenerator={ShaOrderFormData}
 *     />
 *   );
 * };
 *
 * export default OrderRegisterPage;
 * ```
 *
 * 3. 고객 등록 페이지 
 *
 * const CustomerRegisterPage = () => {
 *   return (
 *     <ShaFormTemplate<CustomerFormValues>
 *       title="고객 정보 등록"
 *       initialValues={{
 *         customerName: '',
 *         customerPhone: '',
 *         customerAddr: '',
 *         customerRemark: '',
 *         orderDate: '',
 *         orderCategory: '',
 *         orderProduct: '',
 *         orderTotalAmount: 0,
 *         orderCount: 1,
 *         orderIsDiscount: false,
 *         orderDiscountRatio: 0,
 *         orderRemark: '',
 *         orderDeposit: 0,
 *         depositPayed: false,
 *         orderPayment: '',
 *         orderRecieptDocs: '',
 *         recieptDocsIssued: false,
 *       }}
 *       onSubmit={customerApi.register}
 *       formDataGenerator={ShaCustomerFormData}
 *     />
 *   );
 * };
 *
 * export default CustomerRegisterPage;
 * ```
 *
 * 주의사항:
 * 1. formDataGenerator 함수는 ShaTitledFormControlProps[] 타입을 반환해야 함
 * 2. API 함수는 Promise를 반환하고 success 속성을 포함한 응답을 반환해야 함
 * 3. initialValues는 해당 폼의 모든 필드를 포함해야 함
 * 4. 필수 필드 검증은 각 폼 필드의 required 속성으로 처리
 */
