import { Table } from '@/components/ui/table';
import ATableBody from '@/components/atom/TableBody/ATableBody';
import ATableHeader from '@/components/atom/TableHeader/ATableHeader';

// 타입 정의
export type ATableProps<T> = {
  headers: { [key: string]: string }; // 헤더 텍스트
  data: T[]; // 테이블에 표시할 데이터
  columns: (keyof T)[]; // 열의 데이터 키 배열
  title?: string; // 선택적 테이블 제목
};

const ATable = <T extends { [key: string]: any }>({
  headers,
  data,
  columns,
  title = '',
}: ATableProps<T>) => {
  return (
    <>
      {title && (
        <div className="text-center">
          <h1>{title}</h1>
        </div>
      )}
      <Table>
        <ATableHeader {...headers} /> {/* 헤더 정보 전달 */}
        <ATableBody data={data} columns={columns} /> {/* 데이터와 열 배열 전달 */}
      </Table>
    </>
  );
};

export default ATable;
