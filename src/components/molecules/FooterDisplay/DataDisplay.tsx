import React from 'react';
import ShaText from '@/components/atom/Text/ShaText';

type DataDisplayProps<T> = {
  data: T; // 표시할 데이터 객체
  labelMap?: Partial<Record<keyof T, string>>; // 각 데이터 키에 대한 커스텀 레이블
};

// DataDisplay 컴포넌트 정의 - 일반 데이터를 ShaText 형식으로 표시
const DataDisplay = <T extends Record<string, any>>({
  data,
  labelMap = {},
}: DataDisplayProps<T>) => (
  <>
    {Object.entries(data)
      .filter(([key]) => labelMap[key as keyof T]) // labelMap에 없는 키는 건너뛰기(id(고유번호)해당)
      .map(([key, value]) => (
        <div key={key} className="flex gap-1">
          {/* 데이터 키에 대한 레이블 (커스텀 레이블 또는 기본 키 사용) */}
          <ShaText text={`${labelMap[key as keyof T] || key}:`} isBold size="small" />

          {/* 데이터 값 표시: 배열이면 콤마로 연결하여 표시, 'commission' 키면 퍼센트 추가 휴가일 없으면 없음이라고 띄우기 */}
          <ShaText
            text={
              value === null || value === undefined
                ? '없음'
                : key === 'engineerCommissionRate'
                  ? `${value}%`
                  : Array.isArray(value)
                    ? value.join(', ')
                    : value
            }
            size="small"
          />
        </div>
      ))}
  </>
);

export default DataDisplay;
