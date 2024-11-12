import { CardLayout } from '@/styles/layout/CardLayout/CardLayout';
import { LucideIcon } from 'lucide-react';

type ACardContentProps = {
  Icon: LucideIcon;
  label: string;
  value: string;
};

const ACardContent = ({ Icon, label, value }: ACardContentProps) => {
  return (
    <div className={CardLayout.container}>
      <Icon className={CardLayout.icon} />
      <span className={CardLayout.text}>{label}: </span>
      <span className={CardLayout.text}>{value}</span>
    </div>
  );
};

export default ACardContent;
