'use client';

import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

export type ShaButtonProps = {
  variant?: 'default' | 'secondary' | 'outline';
  text:
    | '등록중지'
    | '취소'
    | '등록'
    | '수정'
    | '아니오'
    | '추가등록'
    | '급여사항확인'
    | '휴무등록'
    | '추가등록'
    | '검색'
    | '수정 완료'
    | '저장'
    | '전달';
    
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'full';
  disabled?: boolean;
  children?: ReactNode;
};

const ShaButton = ({
  variant,
  text,
  onClick,
  size,
  disabled = false,
  children,
}: ShaButtonProps) => {
  return (
    <Button variant={variant} onClick={onClick} size={size} disabled={disabled}>
      {text} {children}
    </Button>
  );
};

export default ShaButton;
