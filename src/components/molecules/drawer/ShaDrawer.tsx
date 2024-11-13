'use client';

import * as React from 'react';
import { AlignJustify, X } from 'lucide-react';
import ShaButton from '../../atom/Button/ShaButton';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import CardFilter from '@/components/molecules/CardFilter/CardFilter';

// 추상화된 ShaDrawerProps 타입 정의
export type ShaDrawerProps<T> = {
  data: T[];
  filterKeys: (keyof T)[];
  filter: string;
  onFilterChange: (value: string) => void;
  onItemClick: (item: T) => void;
  drawerTitle?: string;
  drawerDescription?: string;
};

const ShaDrawer = <T extends { [key: string]: any }>({
  data,
  filterKeys,
  filter,
  onFilterChange,
  onItemClick,
  drawerTitle = '기사님 목록',
  drawerDescription = '기사님을 클릭하세요.',
}: ShaDrawerProps<T>) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ShaButton variant="outline" text="">
          <AlignJustify />
        </ShaButton>
      </DrawerTrigger>
      <DrawerContent className="w-[350px] h-full">
        <div className="flex justify-end p-2">
          <DrawerClose asChild>
            <ShaButton variant="outline" text="" size="sm">
              <X />
            </ShaButton>
          </DrawerClose>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className=" ml-3 flex-col">
            <DrawerTitle>{drawerTitle}</DrawerTitle>
            <DrawerDescription>{drawerDescription}</DrawerDescription>
          </DrawerHeader>
          <div>
            <CardFilter
              data={data}
              filterKeys={filterKeys}
              filter={filter}
              onFilterChange={onFilterChange}
              onItemClick={onItemClick}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShaDrawer;
