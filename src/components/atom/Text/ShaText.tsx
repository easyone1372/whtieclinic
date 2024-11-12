'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// sizes와 colors 타입을 Tailwind 클래스에 맞게 정의
const textSizes = {
  tiny: 'text-xs', // 12px
  small: 'text-sm', // 14px
  medium: 'text-base', // 16px
  large: 'text-lg', // 18px
  xlarge: 'text-xl', // 20px
  huge: 'text-2xl', // 24px
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
};

const ShaText = ({ text, size = 'medium', color = 'default', className }: ShaTextProps) => {
  return <p className={cn(textSizes[size], textColors[color], className)}>{text}</p>;
};

export default ShaText;
