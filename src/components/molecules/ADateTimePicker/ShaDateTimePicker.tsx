'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type ShaDateTimePickerProps = {
  dateLabel?: string;
  timeLabel?: string;
  value?: Date | null;
  onChange?: (newValue: Date | null) => void;
  className?: string;
};

const ShaDateTimePicker = ({
  dateLabel = '날짜',
  value,
  onChange,
  className,
}: ShaDateTimePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const hours = Array.from({ length: 13 }, (_, i) => (i + 7).toString().padStart(2, '0'));

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const newDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      value?.getHours() || 9,
      0
    );

    onChange?.(newDateTime);
    setOpen(false);
  };

  const handleTimeChange = (timeValue: string) => {
    if (!value) {
      const now = new Date();
      now.setHours(9, 0, 0, 0);
      value = now;
    }

    const newDateTime = new Date(value);
    newDateTime.setHours(parseInt(timeValue), 0, 0, 0);
    onChange?.(newDateTime);
  };

  const formattedDate = value ? format(value, 'PPP', { locale: ko }) : dateLabel;
  const formattedHour = value?.getHours().toString().padStart(2, '0');

  return (
    <div className={cn('flex gap-2', className)}>
      <div className="flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formattedDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value || undefined}
              onSelect={handleDateSelect}
              locale={ko}
              initialFocus
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Select value={formattedHour} onValueChange={handleTimeChange}>
        <SelectTrigger className="w-[100px]">
          <Clock className="mr-2 h-4 w-4" />
          <SelectValue placeholder="시" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour}>
              {hour}시
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShaDateTimePicker;
