import {
  // 메인 메뉴 아이콘들
  HardHat, // 기사님 관리 (건설 헬멧 아이콘이 기술자/기사를 잘 표현)
  Users, // 회원 관리 (기존과 동일)
  CalendarClock, // 스케줄 (시간이 표시된 캘린더가 스케줄에 더 적합)
  BarChart3, // 매출 관리 (차트가 매출 표현에 더 적합)

  // 서브 메뉴 아이콘들
  // 리스트 관련
  ClipboardList, // 리스트 보기
  UserPlus, // 등록하기 (사람 추가)
  FileSpreadsheet, // 일자별 매출
  LineChart, // 주간 매출
  PieChart, // 월별 매출
  Pencil, // 수정하기
  CalendarPlus, // 예약하기
} from 'lucide-react';

export const sideBarMenuData = {
  engineer: {
    title: '기사님 관리',
    icon: HardHat,
    links: [
      {
        name: '리스트 보기',
        href: '/engineer/e_list',
        icon: ClipboardList,
      },
      {
        name: '등록하기',
        href: '/engineer/e_register',
        icon: UserPlus,
      },
      {
        name: '수정하기',
        href: '/engineer/e_modify',
        icon: Pencil,
      },
    ],
  },
  member: {
    title: '회원 관리',
    icon: Users,
    links: [
      {
        name: '리스트 보기',
        href: '/customers/c_list',
        icon: ClipboardList,
      },
      {
        name: '예약하기',
        href: '/customers/c_register',
        icon: CalendarPlus,
      },
      {
        name: '수정하기',
        href: '/customers/c_modify',
        icon: Pencil,
      },
    ],
  },
  schedule: {
    title: '스케줄',
    icon: CalendarClock,
    links: [
      {
        name: '리스트 보기',
        href: '/schedule/s_list',
        icon: ClipboardList,
      },
      {
        name: '등록하기',
        href: '/schedule/s_register',
        icon: CalendarPlus,
      },
      {
        name: '수정하기',
        href: '/schedule/s_modify',
        icon: Pencil,
      },
    ],
  },
  sales: {
    title: '매출 관리',
    icon: BarChart3,
    links: [
      {
        name: '일자별 매출',
        href: '/sales/daily',
        icon: FileSpreadsheet,
      },
      {
        name: '주간 매출',
        href: '/sales/weekly',
        icon: LineChart,
      },
      {
        name: '월별 매출',
        href: '/sales/monthly',
        icon: PieChart,
      },
    ],
  },
};
