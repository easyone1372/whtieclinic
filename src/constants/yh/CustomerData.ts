import { CheckboxProps } from '@/components/atom/CheckBox/ShaCheckBox';
import { CheckboxTextType } from '../textType';

export const publishedCheckboxData: { [key: string]: CheckboxProps } = {
  published: {
    textprops: { text: '발행완료' as CheckboxTextType },
  },
};

// 할인적용 체크박스
export const discountCheckboxData: { [key: string]: CheckboxProps } = {
  discount: {
    textprops: { text: '할인적용' as CheckboxTextType },
  },
};
