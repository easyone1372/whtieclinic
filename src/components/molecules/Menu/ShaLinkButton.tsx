import ShaIcon, { AIconProps } from '@/components/atom/Icon/ShaIcon';
import ShaLabel, { ALabelProps } from '@/components/atom/Label/ShaLabel';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type ALinkButtonProps = {
  iconprops: AIconProps;
  labelprops: ALabelProps;
  href: string;
  className?: string;
};

// LinkButton 컴포넌트
const LinkButton = ({ iconprops, labelprops, href, className }: ALinkButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        // 기본 스타일
        'flex items-center gap-2 p-2 px-6 rounded-md transition-colors',
        // 호버 스타일
        'hover:bg-accent hover:text-accent-foreground',
        // 활성 상태 스타일
        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
        className
      )}
    >
      <ShaIcon
        {...iconprops}
        className={cn(isActive ? 'text-accent-foreground' : 'text-muted-foreground')}
      />
      <ShaLabel
        {...labelprops}
        className={cn(isActive ? 'text-accent-foreground' : 'text-muted-foreground')}
      />
    </Link>
  );
};

export default LinkButton;
