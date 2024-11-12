'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type TextAreaSize = 'small' | 'medium' | 'large';

export type ShaTextareaProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  size?: TextAreaSize;
  rows?: number;
  onChange?: (value: string) => void;
  disable?: boolean;
};

const ShaTextarea = ({
  label,
  placeholder,
  className,
  value,
  size = 'medium',
  rows = 4,
  disable = false,
  onChange,
  ...props
}: ShaTextareaProps) => {
  const sizeClasses = {
    small: 'w-32', // 128px
    medium: 'w-64', // 256px
    large: 'w-96', // 384px
  };

  return (
    <div className={cn('grid gap-1.5', sizeClasses[size])}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <Textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn('resize-none min-h-[80px]', className)}
        {...props}
      />
    </div>
  );
};

export default ShaTextarea;
