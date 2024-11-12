import ShaIcon, { AIconProps } from '@/components/atom/Icon/ShaIcon';
import ShaLabel, { ALabelProps } from '@/components/atom/Label/ShaLabel';
import { cn } from '@/lib/utils';

export type TitleMenuBoxProps = {
  iconprops: AIconProps;
  labelprops: ALabelProps;
  className?: string;
};

// TitleMenuBox 컴포넌트
const TitleMenuBox = ({ iconprops, labelprops, className }: TitleMenuBoxProps) => {
  return (
    <div className={cn('flex items-center gap-2 p-3', className)}>
      <ShaIcon {...iconprops} className={cn('text-muted-foreground', iconprops.className)} />
      <ShaLabel {...labelprops} className={cn('text-foreground', labelprops.className)} />
    </div>
  );
};

export default TitleMenuBox;
