import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectAccountModalStyle } from '../../types';

const useMergeStyles = (style?: SelectAccountModalStyle): SelectAccountModalStyle => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: SelectAccountModalStyle = StyleSheet.create({
    itemContainerStyle: {
      flexDirection: 'row',
      paddingVertical: 7,
      paddingHorizontal: 10,
      backgroundColor: '#F4F8FB',
      alignItems: 'center',
    },
    checkboxContainerStyle: {
      padding: 2,
      borderRadius: 4,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      marginRight: 12,
      borderColor: colors.primaryColor,
    },
    accountNameStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: '#000000',
    },
    itemSeparatorStyle: {
      height: 6,
    },
    subNameStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: '#646876',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
