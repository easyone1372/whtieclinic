import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

// AIcon props 타입 정의
export type AIconProps = {
  icon: LucideIcon;
  className?: string;
  color?: string;
};
const ShaIcon = ({ icon: Icon, className, color }: AIconProps) => {
  return <Icon className={cn('h-5 w-5', className)} style={color ? { color } : undefined} />;
};

export default ShaIcon;
