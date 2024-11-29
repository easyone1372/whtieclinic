'use client';

import React from 'react';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import ShaCheckbox from '@/components/atom/CheckBox/ShaCheckBox';
import ShaButton from '../Button/ShaButton';
import { useRouter } from 'next/navigation';

type TableBodyProps<T> = {
  data: T[];
  columns: (keyof T)[];
  isEditing?: boolean;
  onEditRow?: (row: T) => void;
};

const ATableBody = <T extends { [key: string]: any }>({
  data,
  columns,
  isEditing,
  onEditRow,
}: TableBodyProps<T>) => {
  const router = useRouter();

  return (
    <TableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex} className="h-[50px]">
          {columns.map((column, colIndex) => (
            <TableCell key={colIndex} className="text-center">
              {column === 'receiptDocsIssued' ? (
                <ShaCheckbox isChecked={row[column] === true} textprops={{ text: '' }} />
              ) : (
                <span className="truncate max-w-xs inline-block">{row[column]}</span>
              )}
            </TableCell>
          ))}

          {isEditing && (
            <TableCell className="text-center">
              <ShaButton
                variant="outline"
                size="sm"
                text="수정"
                // onClick={() => router.push(`/schedule/s_modify/${row.orderId}`)}
                // />
                onClick={() => onEditRow && onEditRow(row)}
                // size="sm"
                // text="수정"
              />
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ATableBody;
