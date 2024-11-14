'use client';

import * as React from 'react';
import { User, Phone, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { colors } from '@/styles/colors';
import ShaCardContent from '@/components/atom/CardContent/ShaCardContent';

type CardProps = {
  name: string;
  tel: string;
  address: string;
  available?: string;
  remark?: string;
  onClick: () => void;
};

const Cards = ({ name, tel, address, onClick }: CardProps) => {
  return (
    <Card
      onClick={onClick}
      className="w-[300px] bg-white rounded-lg hover:bg-[var(--hover-bg)] group hover:text-[var(--hover-color)] hover:cursor-pointer transition-colors"
      style={
        {
          '--hover-bg': colors.background.drawer,
          '--hover-color': colors.text.title,
        } as React.CSSProperties
      }
    >
      <CardContent className="p-4 flex flex-col gap-1">
        <ShaCardContent Icon={User} label="이름: " value={name} />
        <ShaCardContent Icon={Phone} label="번호: " value={tel} />
        <ShaCardContent Icon={Home} label="주소: " value={address} />
      </CardContent>
    </Card>
  );
};

export default Cards;
