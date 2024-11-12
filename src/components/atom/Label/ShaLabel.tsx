'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export type ALabelProps = {
  text: string;
  className?: string;
  color?: string;
};

const ShaLabel = ({ text, className, color }: ALabelProps) => {
  return (
    <span className={cn('text-sm font-bold', className)} style={color ? { color } : undefined}>
      {text}
    </span>
  );
};

export default ShaLabel;
