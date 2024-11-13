import React from 'react';
import ShaInput from '@/components/atom/Input/ShaInput';

type ShaFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

const ShaFilter = ({ value, onChange }: ShaFilterProps) => {
  return (
    <div className="p-4 flex-shrink-0">
      <ShaInput
        placeholder="이름, 주소 또는 전화번호로 검색"
        value={value}
        onChange={(value) => onChange(value)}
        size="medium"
      />
    </div>
  );
};

export default ShaFilter;
