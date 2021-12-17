import React, { ReactNode } from 'react';
import { CashflowContext, useCashflowContextValue } from './cashflow-context';

export type CashflowProviderProps = {
  children: ReactNode;
};

const CashflowProvider = (props: CashflowProviderProps) => {
  const { children } = props;
  const cashflowContextData = useCashflowContextValue();

  return (
    <CashflowContext.Provider value={cashflowContextData}>{children}</CashflowContext.Provider>
  );
};

export default CashflowProvider;
