const generateMonths = () => {
  return Array.from({ length: 12 }, (_, i) => `${i + 1}월 일정`);
};

export const MonthsPlan: string[] = generateMonths();
