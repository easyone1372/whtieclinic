'use client';

import React from 'react';
import ShaFormField, { ShaFormFieldProps } from './ShaFormField';
import ShaText, { ShaTextProps } from '@/components/atom/Text/ShaText';
import { cn } from '@/lib/utils';

export type ShaTitledFormControlProps = {
  titleprops?: ShaTextProps;
  formfieldprops?: ShaFormFieldProps;
};

const ShaTitledFormControl: React.FC<ShaTitledFormControlProps> = ({
  titleprops,
  formfieldprops,
}) => {
  return (
    <div className="grid gap-2 w-full max-w-fit">
      {titleprops && (
        <div>
          <ShaText {...titleprops} className="font-medium text-m text-foreground" />
        </div>
      )}
      <div>{formfieldprops && <ShaFormField {...formfieldprops} />}</div>
    </div>
  );
};

export default ShaTitledFormControl;
