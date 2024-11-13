'use client';

import React, { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ShaTwoButton from '@/components/molecules/Button/ShaTwoButton';

type FormCardProps = {
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  onReset: () => void;
  isValid: boolean;
  isLoading?: boolean;
};

const ShaCard = ({
  title,
  children,
  onSubmit,
  onReset,
  isValid,
  isLoading = false,
}: FormCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-fit max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 px-6">{children}</CardContent>
        <CardFooter className="flex justify-center space-x-4 pt-6 border-t bg-muted/50">
          <ShaTwoButton
            leftButton={{
              text: '취소',
              onClick: onReset,
              size: 'lg',
              variant: 'outline',
              disabled: isLoading,
            }}
            rightButton={{
              text: '등록',
              onClick: onSubmit,
              disabled: !isValid || isLoading,
              size: 'lg',
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShaCard;
