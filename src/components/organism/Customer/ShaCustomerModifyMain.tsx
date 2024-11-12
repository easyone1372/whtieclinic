'use client';

import { useState } from 'react';
import ShaCustomerInfo from './ShaCustomerRegister';
import ShaSalesInfo from './ShaSalesInfo';
import CustomerModify from './ShaCustomerModify';
import SalesModify from './ShaSalesModify';

const CustomerModifyMain = () => {
  return (
    <>
      <div className="flex">
        <CustomerModify />
        <SalesModify />
      </div>
    </>
  );
};

export default CustomerModifyMain;
