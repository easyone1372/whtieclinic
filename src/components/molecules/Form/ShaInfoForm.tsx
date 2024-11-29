import React from 'react';
import ShaTitledFormControl, { ShaTitledFormControlProps } from './ShaTitledFormControl';

type ShaInfoFormProps = {
  ShaTitledFormControlProps: ShaTitledFormControlProps[];
  twoColumns?: boolean; // 레이아웃 옵션 추가
};

const ShaInfoForm: React.FC<ShaInfoFormProps> = ({
  ShaTitledFormControlProps,
  twoColumns = false, // 기본값은 한 줄
}) => {
  return (
    <div className={twoColumns ? 'grid grid-cols-3 gap-7' : 'flex flex-col gap-7'}>
      {ShaTitledFormControlProps.map((props, index) => (
        <div
          key={index}
          className={props.titleprops?.className?.includes('text-lg') ? 'col-span-2' : ''}
        >
          <ShaTitledFormControl {...props} />
        </div>
      ))}
    </div>
  );
};

export default ShaInfoForm;
