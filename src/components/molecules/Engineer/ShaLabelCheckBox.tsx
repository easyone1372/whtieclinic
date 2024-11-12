'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { EngineerWashingMachineCategory } from '@/constants/Engineer';

export type ShaLabelCheckBoxProps = {
  selectedItems: string[];
  onItemsChange: (newItems: string[]) => void;
  textClassName?: string;
};

const ShaLabelCheckBox: React.FC<ShaLabelCheckBoxProps> = ({
  selectedItems,
  onItemsChange,
  textClassName = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
}) => {
  const handleChange = (key: string) => {
    const newItems = selectedItems.includes(key)
      ? selectedItems.filter((k) => k !== key)
      : [...selectedItems, key];

    onItemsChange(newItems);

    if (newItems.length > 0) {
      console.log(`선택된 항목: ${newItems.join(', ')}`);
    } else {
      console.log('선택된 항목이 없습니다.');
    }
  };

  return (
    <div className="w-fit flex items-center">
      <div className="grid grid-cols-6 w-full">
        {EngineerWashingMachineCategory.map((item) => (
          <div key={item} className="p-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={selectedItems.includes(item)}
                onCheckedChange={() => handleChange(item)}
              />
              <Label htmlFor={item} className={textClassName}>
                {item}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShaLabelCheckBox;
