'use client';

import { useState } from 'react';
import ShaCustomerInfo from './ShaCustomerRegister';
import ShaSalesInfo from './ShaSalesInfo';

const CustomerRegister = () => {
  const [isSalesInfoActive, setIsSalesInfoActive] = useState(false);

  const handleCustomerRegister = () => {
    setIsSalesInfoActive(true);
  };

  return (
    <>
      <div className="flex">
        <ShaCustomerInfo onRegister={handleCustomerRegister} />
        <ShaSalesInfo />
      </div>
    </>
  );
};

export default CustomerRegister;
