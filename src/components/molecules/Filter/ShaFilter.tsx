import React from 'react';
import ShaInput from '@/components/atom/Input/ShaInput';

type ShaFilterProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const ShaFilter = ({ value, onChange, placeholder }: ShaFilterProps) => {
  return (
    <div className="p-4 flex-shrink-0">
      <ShaInput
        placeholder={placeholder}
        value={value}
        onChange={(value) => onChange(value)}
        size="medium"
      />
    </div>
  );
};

export default ShaFilter;
