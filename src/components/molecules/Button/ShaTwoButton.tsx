'use client';

import React from 'react';
import ShaButton, { ShaButtonProps } from '@/components/atom/Button/ShaButton';

type ShaTwoButtonsProps = {
  leftButton: Omit<ShaButtonProps, 'variant'> & {
    variant?: 'outline' | 'secondary';
  };
  rightButton: Omit<ShaButtonProps, 'variant'> & {
    variant?: 'default';
  };
};

const ShaTwoButton = ({ leftButton, rightButton }: ShaTwoButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <ShaButton
        {...leftButton}
        variant={leftButton.variant || 'outline'}
        size={leftButton.size || 'default'}
      />
      <ShaButton
        {...rightButton}
        variant={rightButton.variant || 'default'}
        size={rightButton.size || 'default'}
      />
    </div>
  );
};

export default ShaTwoButton;
