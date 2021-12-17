import { FinancialService } from './../services/financial-service';
import React, { useCallback, useMemo, useState } from 'react';
import { Cashflow, isEmpty } from '@banking-component/core';

export interface CashflowContextData {
  cashflow?: Cashflow;
  isLoadingCashflow: boolean;
  loadCashflowError?: Error;
  clearCashflowError: () => void;
  fetchCashflow: (
    walletIds: string,
    periodFrequence: string,
    baseCurrencyCode: string,
    fromDateTime: string,
    toDateTime?: string,
    sort?: string
  ) => void;
  clearCashflow: () => void;
}

export const cashflowDefaultValue: CashflowContextData = {
  cashflow: undefined,
  isLoadingCashflow: false,
  loadCashflowError: undefined,
  clearCashflowError: () => null,
  fetchCashflow: () => null,
  clearCashflow: () => null,
};

export const CashflowContext =
  React.createContext<CashflowContextData>(cashflowDefaultValue);

export function useCashflowContextValue(): CashflowContextData {
  const [_cashflow, setCashflow] = useState<Cashflow | undefined>(undefined);
  const [_cashflowError, setCashflowError] = useState<Error | undefined>(
    undefined
  );
  const [_isLoadingCashflow, setIsLoadingCashflow] = useState(false);

  const fetchCashflow = useCallback(
    async (
      walletIds: string,
      periodFrequence: string,
      baseCurrencyCode: string,
      fromDateTime: string,
      toDateTime?: string,
      sort?: string
    ) => {
      if (isEmpty(walletIds)) {
        return;
      }
      try {
        setIsLoadingCashflow(true);
        const { data } = await FinancialService.instance().getCashflow(
          walletIds,
          periodFrequence,
          baseCurrencyCode,
          fromDateTime,
          toDateTime,
          sort
        );
        setIsLoadingCashflow(false);
        setCashflow(data);
      } catch (error) {
        setIsLoadingCashflow(false);
        setCashflowError(error as Error);
      }
    },
    []
  );

  const clearCashflowError = useCallback(() => {
    setCashflowError(undefined);
  }, []);

  const clearCashflow = useCallback(() => {
    setCashflow(undefined);
  }, []);

  return useMemo(
    () => ({
      cashflow: _cashflow,
      isLoadingCashflow: _isLoadingCashflow,
      loadCashflowError: _cashflowError,
      fetchCashflow,
      clearCashflowError,
      clearCashflow,
    }),
    [_isLoadingCashflow, _cashflowError, _cashflow]
  );
}
