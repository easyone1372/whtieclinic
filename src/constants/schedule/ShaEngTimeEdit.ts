import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaDateTimePickerProps } from '@/components/molecules/ADateTimePicker/ShaDateTimePicker';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';

export type ShaEngTimeEditFormValues = {
  reservationDateTime: Date | null;
  engineerId: number | null;
  engineerName: string;
};

// `engineerList`를 매개변수로 추가
export const ShaEngTimeEditFormData = (
  formValues: ShaEngTimeEditFormValues,
  handleFieldChange: (fieldName: keyof ShaEngTimeEditFormValues, value: any) => void,
  engineerList: { engineerId: number; engineerName: string }[] // 기사 정보를 담은 리스트
): ShaTitledFormControlProps[] => [
  {
    titleprops: {
      text: '예약일시',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDateTimePicker' as ShaFormFieldType,
          prevprops: {
            dateLabel: '예약 날짜',
            timeLabel: '예약 시간',
            value: formValues.reservationDateTime,
            onChange: (newValue: Date | null) => handleFieldChange('reservationDateTime', newValue),
          } as ShaDateTimePickerProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '기사 선택',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDropdown' as ShaFormFieldType,
          prevprops: {
            label: '기사 선택',
            width: 'medium',
            options: engineerList.map((engineer) => ({
              key: engineer.engineerId,
              value: engineer.engineerId.toString(), // 혹은 engineer.engineerName
              text: engineer.engineerName,
            })),
            value: formValues.engineerName,
            onChange: (value: string) => handleFieldChange('engineerName', value),
          } as ShaDropdownProps,
        },
      ],
    },
  },
];
