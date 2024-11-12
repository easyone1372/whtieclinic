import { CalendarEventType } from '@/components/atom/Calendar/ACalendar';
import { Engineer, EngineerDailyEarning } from '@/constants/yh/EngineerTypeData';


export const createCalendarEvents = (engineer: Engineer): CalendarEventType[] => {
  return engineer.daily_earnings.map((earning) => ({
    title: `${earning.daily_amount.toLocaleString()}원`,
    start: new Date(earning.date),
    end: new Date(earning.date),
    allDay: true,
    amount: earning.daily_amount,
    user: engineer.name,
  }));
};

export const getTotalWage = (engineer: Engineer): number => {
  return engineer.daily_earnings.reduce((sum, dp) => sum + dp.daily_amount, 0);
};

export const calculateWageAmount = (engineer: Engineer): number => {
  const totalWage = getTotalWage(engineer);
  return Math.round(totalWage * (engineer.commission_rate.commission_rate_id / 100));
};

export const calculateNewDailyEarnings = (
  dailyEarnings: EngineerDailyEarning[],
  newTotalAmount: number,
  currentTotal: number
): EngineerDailyEarning[] => {
  const ratio = newTotalAmount / currentTotal;
  return dailyEarnings.map(dp => ({
    ...dp,
    daily_amount: Math.round(dp.daily_amount * ratio),
  }));
};