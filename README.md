# `@banking-component/cashflow-component`

Manage cashflow of multiple linked wallets

## Table Of Content

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Init API Service](#init-api-service)
  - [Init Component Provider](#init-component-provider)
  - [Assets And Multiple Languages](#assets-and-multiple-languages)
- [API Reference](#api-reference)
  - [FinancialService](#walletservice)
  - [CashflowContext](#walletcontext)
  - [CashflowComponent](#walletcomponent)

## Features

- Dislay cashflow chart
- Filter cashflow data by time, individual wallet

## Installation

Open a Terminal in your project's folder and run the command

```sh
yarn add https://github.com/101digital/cashflow-component.git
```

- Installed [@banking-component/core](https://github.com/101digital/banking-component-core.git)
- Installed [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)

If have any issue while installing, can see [Issue While Installing Sub-Component](https://github.com/101digital/react-native-banking-components/blob/master/README.md)

## Quick Start

### Init API Service

- `FinancialService` is initiated should be from `App.ts`

```javascript
import { FinancialService } from '@banking-component/wallet-component';

FinancialService.instance().initClients({
  financialClient: createAuthorizedApiClient(financial), // Your Axios authorized client Finalcial Url,
});
```

### Init Component Provider

- Wrapped the app with `CashflowProvider`

```javascript
import { CashflowProvider } from '@banking-component/wallet-component';

const App = () => {
  return (
    <View>
      <CashflowProvider>{/* YOUR APP COMPONENTS */}</CashflowProvider>
    </View>
  );
};

export default App;
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props into each component

- In order to do multiple languages, you need to configurate `i18n` for [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git). And then, you have to copy and paste all fields and values in [texts](cashflow-component-data.json) into your app locale file. You can also change text value, but DON'T change the key.

## API Reference

### FinancialService

Manage financial services connect to BE. First of all, you need init `FinancialService` soon, should be from `App.ts`

List of functions:

- `getCashflow(walletIds: string, periodFrequency: string, baseCurrencyCode: string, fromDateTime: string, toDateTime?: string, sort?: string)`: Get all cashflow data base on wallet ids and date time

### CashflowContext

Manage state of cashflow.
To access to data, error and function from these contexts, you can use `useContext` inside a React Component

```javascript
export interface CashflowContextData {
  cashflow: undefined;
  isLoadingCashflow: false;
  loadCashflowError: undefined;
  clearCashflowError: () => null;
  fetchCashflow: () => null;
  clearCashflow: () => null;
}
```

### CashflowComponent

- Props, styles and component can be found [here](./src/types.ts)

- Example

```javascript
const CashflowScreen = () => {
  const { loadCashflowError, clearCashflowError } = useContext(CashflowContext);
  const { wallets } = useContext(WalletContext);

  const getErrorDetails = (error?: Error) => {
    if (!error) {
      return undefined;
    }
    return handleCommonError(error);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CashflowComponent
          Root={{
            props: {
              wallets: wallets,
            },
          }}
        />
      </SafeAreaView>
      <ComponentErrorModal
        error={getErrorDetails(loadCashflowError)}
        onClose={clearCashflowError}
        timeOut
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paleGreyTwo,
  },
});

export default CashflowScreen;
```
