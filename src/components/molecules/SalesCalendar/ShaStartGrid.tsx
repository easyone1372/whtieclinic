import { Card, CardContent } from '@/components/ui/card';
import { SalesSummary } from '@/constants/types/MainCalendarType';
import { TrendingUp, ShoppingCart, CalendarDays, CreditCard, ArrowUpRight } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
};

// 단일 통계 카드 컴포넌트
const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, trend }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
          {icon}
        </div>
        {trend && (
          <span className="flex items-center text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            {trend}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
    </CardContent>
  </Card>
);

// 전체 통계 그리드 컴포넌트
export const ShaSalesStatsGrid: React.FC<{ salesSummary: SalesSummary }> = ({ salesSummary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="주간 총 매출"
        value={`￦${salesSummary.totalWeeklySales.toLocaleString()}`}
        subtitle="현재 주의 총 매출"
        icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
      />
      <StatCard
        title="주간 총 주문"
        value={salesSummary.totalWeeklyOrders.toLocaleString()}
        subtitle="현재 주의 총 주문 수"
        icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
      />
      <StatCard
        title="월간 총 매출"
        value={`￦${salesSummary.totalMonthlySales.toLocaleString()}`}
        icon={<CreditCard className="w-6 h-6 text-blue-600" />}
      />
      <StatCard
        title="월간 총 주문"
        value={salesSummary.totalMonthlyOrders.toLocaleString()}
        subtitle="현재 월의 총 주문 수"
        icon={<CalendarDays className="w-6 h-6 text-blue-600" />}
      />
    </div>
  );
};
