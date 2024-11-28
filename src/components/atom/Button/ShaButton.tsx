'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
    | '전달'
    | '기사님 등록'
    | '로그인'
    | '로그아웃'
    | '회원가입'
    | '';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
};

const ShaButton = ({
  variant,
  text,
  onClick,
  size,
  disabled = false,
  children,
  className,
  type,
}: ShaButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      size={size}
      disabled={disabled}
      className={cn(className)}
      type={type}
    >
      {text} {children}
    </Button>
  );
};

export default ShaButton;
