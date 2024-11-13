
import { LucideIcon } from 'lucide-react';

type ACardContentProps = {
  Icon: LucideIcon;
  label: string;
  value: string;
};

const ShaCardContent = ({ Icon, label, value }: ACardContentProps) => {

  const CardLayout = {
    icon: 'h-4 w-4 text-gray-600 group-hover:text-[var(--hover-color)] transition-colors',
    container: 'flex items-center gap-2 ml-2.5',
    text: 'text-sm',
  };
  
  return (
    <div className={CardLayout.container}>
      <Icon className={CardLayout.icon} />
      <span className={CardLayout.text}>{label}</span>
      <span className={CardLayout.text}>{value}</span>
    </div>
  );
};

export default ShaCardContent;
