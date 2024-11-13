import DataDisplay from '@/components/molecules/FooterDisplay/dataDisplay';
import PaymentDetails from '@/components/molecules/FooterDisplay/PaymentDetailes';

import React from 'react';

type AFooterProps<T> = {
  data: T;
  totalAmount: number;
  finalPayment: number;
  isEditing: boolean;
  isChecked: string;
  onFinalPaymentChange: (value: number) => void;
  onCheckboxChange: (key: string) => void;
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
      <h3 className="font-bold text-lg mb-4">{data.name || '정보'}님 상세정보</h3>

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
