import React from 'react';

import PaymentDetails, { PaymentProps } from '@/components/molecules/FooterDisplay/PaymentDetailes';
import DataDisplay from '@/components/molecules/FooterDisplay/DataDisplay';
import ShaText from '@/components/atom/Text/ShaText';

//
type AFooterProps<T> = PaymentProps & {
  data: T;
  labelMap?: Partial<Record<keyof T, string>>;
};

const AFooter = <T extends Record<string, any>>({
  data,
  totalAmount,
  finalPayment,
  isEditing,
  isChecked,
  onFinalPaymentChange,
  onCheckboxChange,
  labelMap = {},
}: AFooterProps<T>) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded shadow-lg">
      <div className="mb-4">
        <ShaText text={`${data.engineerName}의 정보님 상세정보`} isBold size="large" />
      </div>
      {/* 데이터 표시 컴포넌트 */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        <DataDisplay data={data} labelMap={labelMap} />

        {/* 지급 정보 표시 컴포넌트 */}
        <PaymentDetails
          totalAmount={totalAmount}
          finalPayment={finalPayment}
          isEditing={isEditing}
          isChecked={isChecked}
          onFinalPaymentChange={onFinalPaymentChange}
          onCheckboxChange={onCheckboxChange}
        />
      </div>
    </div>
  );
};

export default AFooter;
