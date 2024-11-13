'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const textSizes = {
  tiny: 'text-xs',
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
  xlarge: 'text-xl',
  huge: 'text-2xl',
} as const;

const textColors = {
  default: 'text-foreground',
  primary: 'text-primary',
  secondary: 'text-secondary',
  muted: 'text-muted-foreground',
  destructive: 'text-destructive',
} as const;

export type ShaTextProps = {
  text?: string | React.ReactNode;
  size?: keyof typeof textSizes;
  color?: keyof typeof textColors;
  className?: string;
  isBold?: boolean; // 굵은 텍스트를 위한 prop 추가
};

const ShaText = ({
  text,
  size = 'medium',
  color = 'default',
  className,
  isBold = false,
}: ShaTextProps) => {
  return (
    <p className={cn(textSizes[size], textColors[color], isBold && 'font-bold', className)}>
      {text}
    </p>
  );
};

export default ShaText;
