'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ShaNumericInputProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  min?: number;
  max?: number;
  required?: boolean;
  error?: string;
  showError?: boolean;
  unit?: '원' | '대';
  showSpinner?: boolean;
  step?: number;
};

const formatCurrency = (value: string) => {
  const number = parseFloat(value.replace(/,/g, ''));
  if (isNaN(number)) return '';
  return number.toLocaleString('ko-KR');
};

const unformatCurrency = (value: string) => {
  return value.replace(/,/g, '');
};

const ShaNumericInput = ({
  label,
  value = '',
  onChange,
  placeholder = '0',
  className,
  size = 'medium',
  disabled = false, // 초기값 제거하고 prop으로 직접 사용
  min = 0,
  max,
  required = false,
  error,
  showError = false,
  unit = '원',
  showSpinner = false,
  step = 1,
}: ShaNumericInputProps) => {
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // disabled 상태 체크

    let newValue = unformatCurrency(e.target.value);
    newValue = newValue.replace(/[^\d]/g, '');

    if (newValue.length > 1 && newValue.startsWith('0')) {
      newValue = newValue.replace(/^0+/, '');
    }

    if (newValue === '') {
      onChange?.('0');
      return;
    }

    const numericValue = Number(newValue);
    if (
      !isNaN(numericValue) &&
      (min === undefined || numericValue >= min) &&
      (max === undefined || numericValue <= max)
    ) {
      onChange?.(numericValue.toString());
      setDisplayValue(formatCurrency(newValue));
    }
  };

  const handleIncrement = () => {
    if (disabled) return;

    const currentValue = Number(unformatCurrency(displayValue)) || 0;
    const newValue = currentValue + step;
    if (max === undefined || newValue <= max) {
      onChange?.(newValue.toString());
      setDisplayValue(formatCurrency(newValue.toString()));
    }
  };

  const handleDecrement = () => {
    if (disabled) return;

    const currentValue = Number(unformatCurrency(displayValue)) || 0;
    const newValue = currentValue - step;
    if (newValue >= min) {
      onChange?.(newValue.toString());
      setDisplayValue(formatCurrency(newValue.toString()));
    }
  };

  const sizeClasses = {
    small: 'w-32',
    medium: 'w-64',
    large: 'w-96',
  };

  const showErrorState = showError && required && !value;

  return (
    <div className={cn('grid gap-1.5', sizeClasses[size], className)}>
      {label && (
        <Label className="text-sm font-medium flex items-center gap-2">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Input
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            type="text"
            disabled={disabled}
            className={cn(
              'pr-8',
              showErrorState && 'border-destructive focus-visible:ring-destructive',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {unit}
          </span>
        </div>

        {showSpinner && (
          <div className="flex flex-col gap-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-5 w-7 rounded-b-none border-b-0"
              onClick={handleIncrement}
              disabled={
                disabled || (max !== undefined && Number(unformatCurrency(displayValue)) >= max)
              }
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-5 w-7 rounded-t-none"
              onClick={handleDecrement}
              disabled={disabled || Number(unformatCurrency(displayValue)) <= min}
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {showErrorState && error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default ShaNumericInput;
