'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type InputSize = 'small' | 'medium' | 'large';

export type ShaInputProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  required?: boolean;
  value?: string;
  size?: InputSize;
  showError?: boolean; // 폼 제출 시도 여부를 나타내는 새로운 prop
  onChange?: (value: string) => void ;
};

const ShaInput = ({
  label,
  placeholder,
  error,
  className,
  type = 'text',
  required = false,
  value,
  size = 'medium',
  showError = false, // 기본값은 false
  onChange,
  ...props
}: ShaInputProps) => {
  const displayError = showError && required && !value; // 에러 표시 조건 수정

  const sizeClasses = {
    small: 'w-32',
    medium: 'w-64',
    large: 'w-96',
  };

  return (
    <div className={cn('grid gap-1.5', sizeClasses[size])}>
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          displayError && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        {...props}
      />

      {displayError && (
        <p className="text-xs text-destructive">{error || '필수 입력 항목입니다'}</p>
      )}
    </div>
  );
};

export default ShaInput;
