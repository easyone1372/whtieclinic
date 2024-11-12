// colors.ts

export const colors = {
  // 배경 색상 (Background colors)
  background: {
    main: '#F4F7FA', // 기본 배경 색상
    drawer: '#3F4D67', // 드로어 배경 색상
  },

  // 텍스트 색상 (Text colors)
  text: {
    primary: '#888888', // 메인 텍스트 색상
    secondary: '#E8E3D2', // 보조 텍스트 색상
    drawer: '#9FB3D0', // 드로어 텍스트 색상
    link: '#1dc4e9', // 링크 텍스트 색상 (기본 및 호버)
    active: '#1dc4e9',
    inActive: '#9FB3D0',
    current: '#1dc4e9',
    notCurrent: '#9FB3D0',
    hover: '#1dc4e9', // 링크 호버 시 텍스트 색상
    title: '#E8E3D2', // 메뉴 타이틀 텍스트 색상
    default: '#000000', // 검은색
  },

  // 경계선 색상 (Border colors)
  border: {
    default: '#E5E7EB', // 기본 경계선 색상
  },

  // 그림자 색상 (Shadow colors)
  shadow: {
    default: 'none', // 기본 그림자 설정 (없음)
  },

  // 아이콘 색상 (Icon colors)
  icon: {
    default: '#9FB3D0', // 기본 아이콘 색상
    active: '#1dc4e9', // 활성화된 아이콘 색상
  },

  test: {
    first: '#6C7DA6',
    second: '#4E5D7C',
    third: '#5D6D91',
    fourth: '#7B8DBB',
  },
} as const;
