'use client';

import * as React from 'react';
import { X, AlignJustify } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Engineer, WorkerDrawerProps } from '@/constants/yh/EngineerTypeData';
import CardFilter from '../organism/yh/CardFilter';


const WorkerDrawer = ({
  engineers = [],
  onEngineerSelect,
  open,
  onOpenChange,
}: WorkerDrawerProps) => {
  const [filter, setFilter] = React.useState('');

  const filteredEngineers = React.useMemo(() => {
    return engineers
      .map(
        (engineer): [string, Engineer] => [
          `engineer${engineer.engineer_id}`,
          engineer
        ]
      )
      .filter(([_, engineer]) =>
        engineer.name.toLowerCase().includes(filter.toLowerCase()) ||
        engineer.location.toLowerCase().includes(filter.toLowerCase()) ||
        engineer.phone_number.includes(filter)
      );
  }, [engineers, filter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleEngineerSelect = ([_, engineer]: [string, Engineer]) => {
    onEngineerSelect(engineer);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <AlignJustify />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[350px] h-full">
        <div className="m- w-full h-full flex flex-col items-center">
          <DrawerHeader>
            <div className="flex justify-end">
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
            <DrawerTitle>기사 목록</DrawerTitle>
            <DrawerDescription>기사를 선택하여 일정을 확인하세요.</DrawerDescription>
          </DrawerHeader>

          <CardFilter
            data={filteredEngineers}
            filter={filter}
            onFilterChange={handleFilterChange}
            onItemClick={handleEngineerSelect}
          />

          <DrawerFooter />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WorkerDrawer;