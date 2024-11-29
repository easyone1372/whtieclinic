import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeeklySummary } from '@/constants/types/MainCalendarType';

const WeeklySummaryCard: React.FC<{ summary: WeeklySummary }> = ({ summary }) => (
  <div className="border-b border-gray-200 py-4">
    <div className="text-sm text-gray-500 mb-2">
      {summary.startDate} ~ {summary.endDate}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-sm font-medium text-gray-500">주문</div>
        <div className="text-lg font-bold text-gray-900">
          {summary.totalOrders.toLocaleString()}건
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">매출</div>
        <div className="text-lg font-bold text-blue-600">
          ₩{summary.totalSales.toLocaleString()}
        </div>
      </div>
    </div>
  </div>
);

// 주간 요약 리스트 컴포넌트
export const ShaWeeklySummary: React.FC<{ summaries: WeeklySummary[] }> = ({ summaries }) => (
  <div className="lg:col-span-1 bg-white rounded-lg pt-16">
    <Card>
      <CardHeader>
        <CardTitle>주간 매출 요약</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {summaries.map((summary, index) => (
            <WeeklySummaryCard key={index} summary={summary} />
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
