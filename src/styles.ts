import { ThemeContext } from 'react-native-theme-component';
import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CashflowComponentStyle, ChartComponentStyle } from './types';

const useMergeRootStyles = (
  style?: CashflowComponentStyle
): CashflowComponentStyle => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: CashflowComponentStyle = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: '#f4f8fb',
      zIndex: 10000,
    },
    accountWrapperStyle: {
      backgroundColor: 'white',
      padding: 15,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    accountContainerStyle: {
      flexDirection: 'row',
      height: 40,
      borderWidth: 1,
      borderColor: '#e2e2e2',
      borderRadius: 5,
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    accountNameTextStyle: {
      color: 'black',
      fontSize: 14,
      fontFamily: fonts.regular,
    },
    dateRangeTitleStyle: {
      paddingVertical: 15,
      textAlign: 'center',
      fontSize: 14,
      fontFamily: fonts.medium,
      color: 'black',
    },
    filterContainerStyle: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginHorizontal: 23,
    },
    filterTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#000000',
      paddingVertical: 18,
      marginHorizontal: 23,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

const useMergeChartStyles = (
  style?: ChartComponentStyle
): ChartComponentStyle => {
  const defaultStyles: ChartComponentStyle = StyleSheet.create({
    containerStyle: {
      height: 300,
      backgroundColor: 'white',
      marginHorizontal: 15,
      justifyContent: 'flex-end',
      borderRadius: 24,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    previousButtonStyle: {
      position: 'absolute',
      left: -12,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      zIndex: 10000,
    },
    nextButtonStyle: {
      position: 'absolute',
      right: -12,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      zIndex: 10000,
    },
    legendContainerStyle: {
      flexDirection: 'row',
      paddingTop: 27,
      paddingBottom: 40,
      justifyContent: 'center',
    },
    legendSeparatorStyle: {
      width: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export { useMergeRootStyles, useMergeChartStyles };
