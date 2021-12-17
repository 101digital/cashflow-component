type FinancialClient = {
  financialClient: any;
};

export class FinancialService {
  private static _instance: FinancialService = new FinancialService();

  private _financialClient?: any;

  constructor() {
    if (FinancialService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use FinancialService.getInstance() instead of new.'
      );
    }
    FinancialService._instance = this;
  }

  public static instance(): FinancialService {
    return FinancialService._instance;
  }

  public initClients = (clients: FinancialClient) => {
    this._financialClient = clients.financialClient;
  };

  getCashflow = async (
    walletIds: string,
    periodFrequency: string,
    baseCurrencyCode: string,
    fromDateTime: string,
    toDateTime?: string,
    sort?: string
  ) => {
    if (this._financialClient) {
      const response = await this._financialClient.get('cashflows', {
        params: {
          walletIds,
          periodFrequency,
          baseCurrencyCode,
          fromDateTime,
          toDateTime,
          sort: sort ?? 'walletId',
        },
      });
      return response.data;
    } else {
      throw new Error('Financial Client is not registered');
    }
  };
}
