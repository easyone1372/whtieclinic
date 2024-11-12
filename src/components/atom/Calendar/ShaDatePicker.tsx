'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type ShadcnDatePickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  dateFormat?: string;
  className?: string;
};

const ShadcnDatePicker: React.FC<ShadcnDatePickerProps> = ({
  value,
  onChange,
  dateFormat = 'yyyy년 MM월 dd일',
  className,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, dateFormat, { locale: ko }) : <span>날짜 선택</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} locale={ko} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default ShadcnDatePicker;
