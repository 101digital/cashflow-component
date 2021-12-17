import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { LegendStyle } from '../../types';

const useMergeStyles = (style?: LegendStyle): LegendStyle => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: LegendStyle = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dotStyle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 3,
    },
    labelStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: 'black',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
