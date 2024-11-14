import { Table } from '@/components/ui/table';
import ATableBody from '@/components/atom/TableBody/ATableBody';
import ATableHeader from '@/components/atom/TableHeader/ATableHeader';

// 타입 정의
export type ATableProps<T> = {
  headers: { [key: string]: string }; // 헤더 텍스트
  data: T[]; // 테이블에 표시할 데이터
  columns: (keyof T)[]; // 열의 데이터 키 배열
  title?: string; // 선택적 테이블 제목
  isEditing?: boolean; // 스케쥴테이블에서 수정 버튼 클릭시 반응
  onEditRow?: (row: T) => void;
};

const ATable = <T extends { [key: string]: any }>({
  headers,
  data,
  columns,
  title = '',
  isEditing = false,
  onEditRow,
}: ATableProps<T>) => {
  return (
    <>
      {title && (
        <div className="text-center">
          <h1>{title}</h1>
        </div>
      )}
      <Table>
        <ATableHeader props={headers} isEditing={isEditing} /> {/* 헤더 정보 전달 */}
        <ATableBody data={data} columns={columns} onEditRow={onEditRow} isEditing={isEditing} />
        {/* 데이터와 열 배열 전달 */}
      </Table>
    </>
  );
};

export default ATable;
