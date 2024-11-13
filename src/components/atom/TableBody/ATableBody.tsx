import React from 'react';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import ShaCheckbox from '@/components/atom/CheckBox/ShaCheckBox';

type TableBodyProps<T> = {
  data: T[]; // 렌더링할 데이터 배열
  columns: (keyof T)[]; // 열에 해당하는 데이터 키 배열
};

const ATableBody = <T extends { [key: string]: any }>({ data, columns }: TableBodyProps<T>) => {
  return (
    <TableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column, colIndex) => (
            <TableCell key={colIndex} className="text-center">
              {/* 'reciept_docs_issued' 컬럼일 때만 체크박스로 표시 */}
              {column === 'reciept_docs_issued' ? (
                <ShaCheckbox
                  isChecked={row[column] === 'true'}
                  textprops={{ text: '' }} // 체크박스 텍스트는 빈 값으로 설정
                />
              ) : (
                row[column]
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ATableBody;
