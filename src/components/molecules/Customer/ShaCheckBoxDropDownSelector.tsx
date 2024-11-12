'use client';

import React from 'react';
import { productCategories } from '@/constants/productCategory';
import ShaOneCheckbox, { ShaOneCheckboxProps } from '../checkbox/ShaOneCheckBox';
import ShaDropdown, { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import ShaTextarea from '@/components/atom/Input/ShaTextArea';

export type ShaCheckboxDropdownSelectorProps = {
  onecheckboxprops: ShaOneCheckboxProps;
  dropdownprops?: Omit<ShaDropdownProps, 'options'>;
  customInputValue?: string;
  onProductChange?: (value: string) => void;
};

const ShaCheckboxDropdownSelector = ({
  onecheckboxprops,
  dropdownprops,
  customInputValue,
  onProductChange,
}: ShaCheckboxDropdownSelectorProps) => {
  const { value: selectedCategory, onChange: handleCheckboxChange, checkboxes } = onecheckboxprops;

  const {
    value: selectedDropdownValue,
    onChange: handleDropdownChange,
    label,
  } = dropdownprops || {};

  // 카테고리에 따른 드롭다운 옵션 생성
  const categoryData = selectedCategory
    ? productCategories[selectedCategory as keyof typeof productCategories]
    : null;

  const dropdownOptions = categoryData
    ? categoryData.categories.map((product) => ({
        value: product.category,
        text: product.category,
      }))
    : [];

  const needsCustomInput =
    selectedDropdownValue === '스탠드' ||
    selectedDropdownValue === '투인원' ||
    selectedDropdownValue === '기타';

  return (
    <div className="flex items-center gap-4">
      <ShaOneCheckbox
        checkboxes={checkboxes}
        value={selectedCategory}
        onChange={handleCheckboxChange}
      />

      <div className="flex flex-col gap-2">
        {selectedCategory && (
          <ShaDropdown
            key={selectedCategory}
            label={label}
            value={selectedDropdownValue}
            options={dropdownOptions}
            width="medium"
            
            onChange={handleDropdownChange}
          />
        )}

        {needsCustomInput && (
          <ShaTextarea
            key={selectedDropdownValue}
            placeholder="세부 사항 입력"
            value={customInputValue}
            onChange={onProductChange}
            size="medium"
            rows={2}
            className="min-h-[60px]"
          />
        )}
      </div>
    </div>
  );
};

export default ShaCheckboxDropdownSelector;
