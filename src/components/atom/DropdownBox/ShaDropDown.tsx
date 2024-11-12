'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { Days } from '@/constants/Days';
import { Document } from '@/constants/Document';

import { Payment } from '@/constants/Payment';
import { Percentage } from '@/constants/Percentage';
import { productCategories } from '@/constants/productCategory';
import { MonthsPlan } from '@/constants/MonthsPlan';

type AllowedObjects =
  | (typeof Days)[number]
  | (typeof Document)[number]
  | (typeof MonthsPlan)[number]
  | (typeof Payment)[number]
  | (typeof Percentage)[number]
  | (typeof productCategories.airConditioner.categories)[number]['category']
  | (typeof productCategories.washingMachine.categories)[number]['category'];

type widthOptions = 'small' | 'medium' | 'large';

type OptionsProps = {
  value: AllowedObjects;
  text: AllowedObjects;
};

export type ShaDropdownProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: OptionsProps[];
  width?: widthOptions;
  color?: string;
};

const ShaDropdown: React.FC<ShaDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  width = 'small',
  color,
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        className={cn(
          {
            'w-32': width === 'small',
            'w-64': width === 'medium',
            'w-96': width === 'large',
          },
          color && `text-${color}`
        )}
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="max-h-max overflow-hidden">
        {options.map((option) => (
          <SelectItem key={String(option.value)} value={String(option.value)}>
            {String(option.text)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ShaDropdown;
