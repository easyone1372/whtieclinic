'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import ShaNumericInput, { ShaNumericInputProps } from '../input/ShaNumericInput';

export type ShaDiscountCheckboxProps = {
  checkboxProps?: {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
  };
  numericInputProps?: Omit<ShaNumericInputProps, 'disabled'>;
  className?: string;
};

const ShaDiscountCheckbox = ({
  checkboxProps,
  numericInputProps,
  className,
}: ShaDiscountCheckboxProps) => {
  const {
    checked = false,
    onCheckedChange,
    label = '할인 적용',
    disabled = false,
  } = checkboxProps || {};

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="discount-checkbox"
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
        <Label
          htmlFor="discount-checkbox"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      </div>

      <ShaNumericInput {...numericInputProps} disabled={!checked || disabled} size="medium" />
    </div>
  );
};

export default ShaDiscountCheckbox;
