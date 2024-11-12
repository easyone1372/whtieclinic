import { ReactNode } from 'react';

interface CenteredLayoutProps {
  children: ReactNode;
  className?: string;
}

const CenteredLayout = ({ children, className = '' }: CenteredLayoutProps) => {
  return <div className={`flex flex-col items-center justify-center ${className}`}>{children}</div>;
};

export default CenteredLayout;
