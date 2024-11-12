import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';

export type ShaDateSchedulePickerProps = {
  dateLabel?: string;
  value?: Date | null;
  onChange?: (newValue: Date | null) => void;
  className?: string;
};

const ShaDateSchedulePicker = ({
  dateLabel = '날짜',
  value,
  onChange,
  className,
}: ShaDateSchedulePickerProps) => {
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const newDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    onChange?.(newDateTime);
  };

  return (
    <div className={cn('flex gap-2', className)}>
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, 'PPP', { locale: ko }) : <span>{dateLabel}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value || undefined}
              onSelect={handleDateSelect}
              locale={ko}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ShaDateSchedulePicker;
