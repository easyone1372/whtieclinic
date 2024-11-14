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

// ShaDrawerProps 타입 정의 - 제너릭 타입을 사용하여 다양한 데이터 타입을 받을 수 있도록 구성
export type ShaDrawerProps<T> = {
  data: T[]; // 드로어에서 필터링할 데이터 배열
  filterKeys: (keyof T)[]; // 필터링에 사용할 데이터 키 목록
  filter: string; // 현재 필터 상태
  onFilterChange: (value: string) => void; // 필터 상태 변경 함수
  onItemClick: (item: T) => void; // 드로어에서 항목 클릭 시 호출되는 함수
  drawerTitle?: string; // 드로어 타이틀 (기본값 제공 가능)
  drawerDescription?: string; // 드로어 설명 (기본값 제공 가능)
  isOpen: boolean; // 드로어 열림 상태
  setIsOpen: (isOpen: boolean) => void; // 드로어 열림 상태를 제어하는 함수
};

// ShaDrawer 컴포넌트 정의
const ShaDrawer = <T extends { [key: string]: any }>({
  data,
  filterKeys,
  filter,
  onFilterChange,
  onItemClick,
  drawerTitle = '기사님 목록',
  drawerDescription = '기사님을 클릭하세요.',
  isOpen,
  setIsOpen,
}: ShaDrawerProps<T>) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <ShaButton variant="outline" text="">
          <AlignJustify />
        </ShaButton>
      </DrawerTrigger>

      <DrawerContent className="w-[350px] h-screen">
        <div className="flex justify-end">
          <DrawerClose asChild>
            <ShaButton variant="outline" text="" size="sm">
              <X />
            </ShaButton>
          </DrawerClose>
        </div>

        {/* Drawer 헤더 영역 */}
        <div className="mx-auto w-full max-w-sm ">
          <DrawerHeader className=" ml-2 flex-col">
            <DrawerTitle>{drawerTitle}</DrawerTitle>
            <DrawerDescription>{drawerDescription}</DrawerDescription>
          </DrawerHeader>
        </div>

        {/* CardFilter 영역 - 스크롤 가능 영역 */}
        <div className="overflow-y-auto h-[calc(100vh-200px)] ">
          <CardFilter
            data={data}
            filterKeys={filterKeys}
            filter={filter}
            onFilterChange={onFilterChange}
            onItemClick={(item) => {
              onItemClick(item);
              setIsOpen(false);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default ShaDrawer;
