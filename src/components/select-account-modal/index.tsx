import React, { useState, useContext, ReactNode } from 'react';
import { Wallet } from '@banking-component/core';
import { BottomSheet, ThemeContext, Button } from 'react-native-theme-component';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { CheckedIcon } from '../../assets/images';
import useMergeStyles from './theme';
import { SelectAccountModalStyle } from '../../types';

interface SelectAccountModalProps {
  isVisible: boolean;
  wallets: Wallet[];
  selectedWallets: Wallet[];
  applyTitle?: string;
  activeColor?: string;
  inactiveColor?: string;
  checkedIcon?: ReactNode;
  onClose: () => void;
  onApplied: (wallets: Wallet[]) => void;
  style?: SelectAccountModalStyle;
}

const SelectAccountModal = (props: SelectAccountModalProps) => {
  const {
    isVisible,
    wallets,
    selectedWallets,
    onClose,
    onApplied,
    style,
    applyTitle,
    inactiveColor,
    activeColor,
    checkedIcon,
  } = props;
  const { colors, i18n } = useContext(ThemeContext);
  const styles: SelectAccountModalStyle = useMergeStyles(style);

  const [_selectedWallets, setSelectedWallets] = useState<Wallet[]>(selectedWallets);

  const _renderItem = (
    label: string,
    isSelected: boolean,
    onPress: () => void,
    subLabel?: string
  ) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.itemContainerStyle} onPress={onPress}>
        <View
          style={[
            styles.checkboxContainerStyle,
            {
              backgroundColor: isSelected
                ? activeColor ?? colors.primaryColor
                : inactiveColor ?? 'white',
            },
          ]}
        >
          {checkedIcon ?? <CheckedIcon size={16} color={'white'} />}
        </View>
        <Text style={styles.accountNameStyle}>{label}</Text>
        {subLabel && <Text style={styles.subNameStyle}>{` (${subLabel})`}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheet isVisible={isVisible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <FlatList
        keyExtractor={(item) => item.walletId}
        data={wallets}
        ListHeaderComponent={() => {
          const isSelected = _selectedWallets.length === wallets.length;
          return (
            <View>
              {_renderItem(
                i18n?.t('cash_flow.lbl_all_accounts') ?? 'All Accounts',
                isSelected,
                () => {
                  if (isSelected) {
                    setSelectedWallets([]);
                  } else {
                    setSelectedWallets(wallets);
                  }
                }
              )}
              <View style={styles.itemSeparatorStyle} />
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
        renderItem={({ item }) => {
          const isSelected = _selectedWallets.includes(item);
          return _renderItem(
            item.walletName,
            isSelected,
            () => {
              if (isSelected) {
                setSelectedWallets(_selectedWallets.filter((w) => w.walletId !== item.walletId));
              } else {
                setSelectedWallets([..._selectedWallets, item]);
              }
            },
            `${item.bankAccount?.bankBranchId ?? ''} ${item.bankAccount.accountNumber}`.trim()
          );
        }}
        ListFooterComponent={() => {
          return (
            <Button
              style={
                styles.buttonStyle ?? {
                  primaryContainerStyle: {
                    marginTop: 30,
                  },
                }
              }
              label={applyTitle ?? i18n?.t('cash_flow.btn_apply') ?? 'Apply'}
              onPress={() => onApplied(_selectedWallets)}
            />
          );
        }}
      />
    </BottomSheet>
  );
};

export default SelectAccountModal;
