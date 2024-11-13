// utils/validation.ts

// 숫자만 허용하는 정규 표현식
export const isNumberOnly = (value: string) => /^[0-9]+$/.test(value);

// 한글만 허용하는 정규 표현식
export const isHangulOnly = (value: string) => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(value);

export const isRequired = (value: any): boolean => {
  return value !== '' && value !== null && value !== undefined;
};
