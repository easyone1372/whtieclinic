'use client';

import React from 'react';
import ShaText from '@/components/atom/Text/ShaText';
import ShaInput from '@/components/atom/Input/ShaInput';
import { FooterProps } from '@/constants/yh/EngineerTypeData';

const AFooter = ({ data, isEditing }: FooterProps) => {
  return (
    <div className="p-4 flex flex-col gap-3 bg-[#f5f5f5] rounded-lg shadow-md">
      <ShaText text="요약 정보" size="large" />
      <div className="border-b border-gray-200" />
      {data.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <ShaText text={`${item.label}:`} size="medium" color="primary" />
          {isEditing && item.isEditable ? (
            <ShaInput
              type="number"
              className="w-[200px]"
              value={String(item.value).replace(/[^0-9]/g, '')}
              onChange={(value) => item.onValueChange?.(value)}
              size="small"
            />
          ) : item.renderValue ? (
            <div className="flex items-center">{item.renderValue(item.value)}</div>
          ) : (
            <ShaText text={item.value} size="medium" />
          )}
        </div>
      ))}
    </div>
  );
};

export default AFooter;
