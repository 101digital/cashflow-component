import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { FilterItemStyle } from '../../types';

const useMergeStyles = (style?: FilterItemStyle): FilterItemStyle => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: FilterItemStyle = StyleSheet.create({
    containerStyle: {
      minWidth: 64,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginBottom: 8,
      borderWidth: 1,
    },
    activeLabelStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: 'white',
    },
    inActiveLabelStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: 'black',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
