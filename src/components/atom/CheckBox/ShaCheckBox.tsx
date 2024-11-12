'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type TextProps = {
  text?: string;
  className?: string;
};

export type CheckboxProps = {
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  textprops?: TextProps;
};

const ShaCheckbox = ({ isChecked = false, onChange, textprops }: CheckboxProps) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Checkbox checked={isChecked} onCheckedChange={onChange} />
      {textprops?.text && (
        <Label
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            textprops.className
          )}
        >
          {textprops.text}
        </Label>
      )}
    </div>
  );
};

export default ShaCheckbox;
