'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import ShaHolidayRegistration, {
  ShaHolidayRegistrationProps,
} from '@/components/molecules/Engineer/ShaHolidayRegistration';
import ShaButton, { ShaButtonProps } from '@/components/atom/Button/ShaButton';
import ShadcnDatePicker, { ShadcnDatePickerProps } from '@/components/atom/Calendar/ShaDatePicker';
import ShaLabelCheckBox, { ShaLabelCheckBoxProps } from '../Engineer/ShaLabelCheckBox';
import ShaHoliday, { ShaHolidayProps } from '../Engineer/ShaHoliday';
import ShaDropdown, { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import ShaInput, { ShaInputProps } from '@/components/atom/Input/ShaInput';
import ShaTextarea, { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import ShaDateTimePicker, { ShaDateTimePickerProps } from '../ADateTimePicker/ShaDateTimePicker';
import ShaOneCheckbox, { ShaOneCheckboxProps } from '../checkbox/ShaOneCheckBox';
import ShaCheckboxDropdownSelector, {
  ShaCheckboxDropdownSelectorProps,
} from '../Customer/ShaCheckBoxDropDownSelector';
import ShaNumericInput, { ShaNumericInputProps } from '../input/ShaNumericInput';
import ShaDiscountCheckbox, { ShaDiscountCheckboxProps } from '../Customer/ShaDiscountCheckBox';
import ShaDateSchedulePicker, {
  ShaDateSchedulePickerProps,
} from '@/components/molecules/ADateTimePicker/ShaDateSchedulePicker';
import ShaCheckbox, { CheckboxProps } from '@/components/atom/CheckBox/ShaCheckBox';

// 타입 정의는 기존과 유사하게 유지
export type ShaFormFieldType =
  | 'ShaButton'
  | 'ShadcnDatePicker'
  | 'ShaInput'
  | 'ShaDropdown'
  | 'ShaLabelCheckBox'
  | 'ShaHoliday'
  | 'ShaHolidayRegistration'
  | 'ShaTextarea'
  | 'ShaDateTimePicker'
  | 'ShaOneCheckbox'
  | 'ShaCheckbox'
  | 'ShaCheckboxDropdownSelector'
  | 'ShaNumericInput'
  | 'ShaDiscountCheckbox'
  | 'ShaDateSchedulePicker';
export type ShaFormFieldConfigProps = {
  formfieldtype: ShaFormFieldType;
  prevprops?:
    | ShaButtonProps
    | ShadcnDatePickerProps
    | ShaInputProps
    | ShaDropdownProps
    | ShaLabelCheckBoxProps
    | ShaHolidayProps
    | ShaHolidayRegistrationProps
    | ShaTextareaProps
    | ShaDateTimePickerProps
    | ShaOneCheckboxProps
    | CheckboxProps
    | ShaCheckboxDropdownSelectorProps
    | ShaNumericInputProps
    | ShaDiscountCheckboxProps
    | ShaDateSchedulePickerProps;
};

export type ShaFormFieldProps = {
  fields: ShaFormFieldConfigProps[];
};

// 컴포넌트 매핑
const fieldTypeToComponentMap: Record<ShaFormFieldType, React.ElementType> = {
  ShaButton,
  ShadcnDatePicker,
  ShaInput,
  ShaDropdown,
  ShaLabelCheckBox,
  ShaHoliday,
  ShaHolidayRegistration,
  ShaTextarea,
  ShaDateTimePicker,
  ShaOneCheckbox,
  ShaCheckbox,
  ShaCheckboxDropdownSelector,
  ShaNumericInput,
  ShaDiscountCheckbox,
  ShaDateSchedulePicker,
};

const ShaFormField = ({ fields }: ShaFormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, index) => {
        const Component = fieldTypeToComponentMap[field.formfieldtype];
        return Component ? (
          <Component key={`${field.formfieldtype}-${index}`} {...field.prevprops} />
        ) : null;
      })}
    </div>
  );
};

export default ShaFormField;
