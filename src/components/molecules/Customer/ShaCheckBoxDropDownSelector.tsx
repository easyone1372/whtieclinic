'use client';

import React from 'react';
import ShaOneCheckbox from '../checkbox/ShaOneCheckBox';
import ShaDropdown from '@/components/atom/DropdownBox/ShaDropDown';
import ShaTextarea from '@/components/atom/Input/ShaTextArea';
import { ProductCategory, productCategories } from '@/data/ProductCategory';

// Props 타입 정의
export type ShaCheckboxDropdownSelectorProps = {
  onecheckboxprops: {
    checkboxes: Record<string, { textprops: { text: string } }>;
    value: string;
    onChange: (value: string) => void;
  };
  dropdownprops?: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  };
  customInputValue?: string;
  onProductChange?: (value: string) => void;
};

const ShaCheckboxDropdownSelector = ({
  onecheckboxprops,
  dropdownprops,
  customInputValue,
  onProductChange,
}: ShaCheckboxDropdownSelectorProps) => {
  // 선택된 카테고리에 따른 드롭다운 옵션 생성
  const options = onecheckboxprops.value
    ? productCategories[onecheckboxprops.value as ProductCategory]?.categories.map((item) => ({
        value: item.category,
        text: item.category,
      }))
    : [];

  return (
    <div className="flex items-center gap-4">
      <ShaOneCheckbox {...onecheckboxprops} />

      {onecheckboxprops.value && (
        <div className="flex flex-col gap-2">
          <ShaDropdown
            key={onecheckboxprops.value}
            width="medium"
            options={options}
            {...dropdownprops}
          />
          {dropdownprops?.value && (
            <ShaTextarea
              key={dropdownprops.value}
              placeholder="세부 사항 입력"
              value={customInputValue}
              onChange={onProductChange}
              size="medium"
              rows={2}
              className="min-h-[60px]"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ShaCheckboxDropdownSelector;
