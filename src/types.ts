import { Wallet } from '@banking-component/core';
import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';

export type CashflowComponentProps = {
  Root: {
    props: {
      filterTitle?: string;
      wallets: Wallet[];
    };
    styles?: CashflowComponentStyle;
  };
  Chart?: {
    props?: {
      height?: number;
      barBorderRadius?: number;
      barWidth?: number;
      spacing?: number;
      noOfSections?: number;
      axisLineColor?: string;
      moneyInColor?: string;
      moneyOutColor?: string;
    };
    components?: {
      nextIcon?: ReactNode;
      previousIcon?: ReactNode;
    };
    styles?: ChartComponentStyle;
  };
  Legend?: {
    props?: {
      moneyInTitle?: string;
      moneyOutTitle?: string;
    };
    styles?: LegendStyle;
  };
  SelectAccount?: {
    props?: {
      applyTitle?: string;
      activeColor?: string;
      inactiveColor?: string;
    };
    components?: {
      checkedIcon?: ReactNode;
    };
    styles?: SelectAccountModalStyle;
  };
  FilterItem?: {
    props?: {
      itemSpace?: number;
      activeColor?: string;
      inActiveColor?: string;
    };
    styles?: FilterItemStyle;
  };
};

export type CashflowComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  accountWrapperStyle?: StyleProp<ViewStyle>;
  accountContainerStyle?: StyleProp<ViewStyle>;
  accountNameTextStyle?: StyleProp<TextStyle>;
  filterContainerStyle?: StyleProp<ViewStyle>;
  filterTextStyle?: StyleProp<TextStyle>;
  dateRangeTitleStyle?: StyleProp<TextStyle>;
};

export type ChartComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  previousButtonStyle?: StyleProp<ViewStyle>;
  nextButtonStyle?: StyleProp<ViewStyle>;
  legendContainerStyle?: StyleProp<ViewStyle>;
  legendSeparatorStyle?: StyleProp<ViewStyle>;
};

export type SelectAccountModalStyle = {
  itemContainerStyle?: StyleProp<ViewStyle>;
  checkboxContainerStyle?: StyleProp<ViewStyle>;
  accountNameStyle?: StyleProp<TextStyle>;
  subNameStyle?: StyleProp<TextStyle>;
  itemSeparatorStyle?: StyleProp<ViewStyle>;
  buttonStyle?: ButtonStyles;
};

export type FilterItemStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  activeLabelStyle?: StyleProp<TextStyle>;
  inActiveLabelStyle?: StyleProp<TextStyle>;
};

export type LegendStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};
