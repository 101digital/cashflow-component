import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CashflowContext } from './context/cashflow-context';
import moment from 'moment';
import { BarChart } from 'react-native-gifted-charts';
import LegendComponent from './components/legend';
import { NextIcon, PreviousIcon, ArrowDownIcon } from './assets/images';
import FilterItemComponent from './components/filter-item';
import SelectAccountModal from './components/select-account-modal';
import { DateRangePicker, ThemeContext } from 'react-native-theme-component';
import { CashflowComponentProps, CashflowComponentStyle, ChartComponentStyle } from './types';
import { useMergeChartStyles, useMergeRootStyles } from './styles';
import { Wallet } from '@banking-component/core';

const CashflowComponent = (props: CashflowComponentProps) => {
  const { Root, Chart, FilterItem, Legend, SelectAccount } = props;
  const dateFormat = 'YYYY-MM-DDTHH:mm:ss';
  const { cashflow, fetchCashflow, clearCashflow } = useContext(CashflowContext);
  const { colors, fonts, i18n } = useContext(ThemeContext);
  /// start with 1 year
  const [filterIndex, setFilterIndex] = useState<number>(4);
  const [frequency, setFrequency] = useState<'weekly' | 'monthly' | 'daily'>('monthly');
  const [fromDate, setFromDate] = useState<string>(moment().startOf('y').format(dateFormat));
  const [toDate, setToDate] = useState<string | undefined>(undefined);
  const [barData, setBarData] = useState<any[]>([]);
  const [selectedWallets, setSelectedWallets] = useState<Wallet[]>(Root.props.wallets);
  const [isShowSelectAccount, setShowSelectAccount] = useState(false);
  const [isShowDatePicker, setShowDatePicker] = useState(false);

  const rootStyles: CashflowComponentStyle = useMergeRootStyles(Root.styles);
  const chartStyles: ChartComponentStyle = useMergeChartStyles(Chart?.styles);

  useEffect(() => {
    fetchCashflow(
      selectedWallets.map((w) => w.walletId).join(','),
      frequency,
      'USD',
      fromDate,
      toDate
    );
    return () => {
      clearCashflow();
    };
  }, [fromDate, toDate, frequency, Root.props.wallets, selectedWallets]);

  const handleChangeFilter = (index: number) => {
    setFilterIndex(index);
    let _fromDate;
    switch (index) {
      case 0:
        _fromDate = moment().startOf('d');
        setFrequency('daily');
        break;
      case 1:
        _fromDate = moment().startOf('M');
        setFrequency('weekly');
        break;
      case 2:
        _fromDate = moment().startOf('M').subtract(2, 'M');
        setFrequency('weekly');
        break;
      case 3:
        _fromDate = moment().startOf('M').subtract(5, 'M');
        setFrequency('monthly');
        break;
      case 4:
        _fromDate = moment().startOf('y');
        setFrequency('monthly');
        break;
      default:
        break;
    }
    if (_fromDate) {
      setFromDate(_fromDate?.format(dateFormat));
    }
    setToDate(undefined);
  };

  const getXAxisLabel = (from: string, to: string) => {
    if (frequency === 'monthly') {
      return moment(from).format('MMM');
    }
    if (frequency === 'weekly') {
      return `${moment(from).format('DD')}-${moment(to).format('DD')}`;
    }
    return moment(from).format('MMM DD');
  };

  useEffect(() => {
    if (cashflow) {
      let _barData: any[] = [];
      cashflow.cashflowPeriods.forEach((cash) => {
        _barData.push({
          value: cash.totalMoneyIn ?? 0,
          label: getXAxisLabel(cash.from, cash.to),
          spacing: 0,
          frontColor: Chart?.props?.moneyInColor ?? '#1AA367',
          labelWidth: 46,
          labelTextStyle: { color: '#000000', fontSize: 10, fontFamily: fonts.regular },
        });
        _barData.push({
          value: cash.totalMoneyOut ?? 0,
          frontColor: Chart?.props?.moneyOutColor ?? '#F1B937',
        });
      });
      setBarData(_barData);
    }
  }, [cashflow]);

  const getShowDate = () => {
    if (filterIndex === 0) {
      return moment(fromDate).format('MMMM DD, YYYY');
    }
    if (filterIndex === 1) {
      return moment(fromDate).format('MMMM YYYY');
    }
    if (filterIndex === 5) {
      return `${moment(fromDate).format('MMMM DD, YYYY')} - ${moment(toDate).format(
        'MMMM DD, YYYY'
      )}`;
    }
    return `${moment(fromDate).format('MMMM YYYY')} - ${moment(toDate).format('MMMM YYYY')}`;
  };

  const shortAmount = (num: number) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + 'K';
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + 'M';
    }
    return num.toFixed(0);
  };

  const handleNext = () => {
    let _fromDate, _toDate;
    switch (filterIndex) {
      case 0:
        _fromDate = moment(fromDate).add(1, 'd');
        _toDate = moment(_fromDate).endOf('d');
        break;
      case 1:
        _fromDate = moment(fromDate).add(1, 'M');
        _toDate = moment(_fromDate).endOf('M');
        break;
      case 2:
        _fromDate = moment(fromDate).add(2, 'M');
        _toDate = moment(_fromDate).add(2, 'M').endOf('M');
        break;
      case 3:
        _fromDate = moment(fromDate).add(5, 'M');
        _toDate = moment(_fromDate).add(5, 'M').endOf('M');
        break;
      case 4:
        _fromDate = moment(fromDate).add(1, 'y');
        _toDate = moment(_fromDate).endOf('y');
        break;
      default:
        break;
    }
    if (_fromDate) {
      setFromDate(_fromDate?.format(dateFormat));
    }
    if (moment(_toDate).isAfter(new Date())) {
      setToDate(undefined);
    } else {
      setToDate(_toDate?.format(dateFormat));
    }
  };

  const handlePrevious = () => {
    let _fromDate, _toDate;
    switch (filterIndex) {
      case 0:
        _fromDate = moment(fromDate).subtract(1, 'd');
        _toDate = moment(_fromDate).endOf('d');
        break;
      case 1:
        _fromDate = moment(fromDate).subtract(1, 'M');
        _toDate = moment(_fromDate).endOf('M');
        break;
      case 2:
        _fromDate = moment(fromDate).subtract(2, 'M');
        _toDate = moment(_fromDate).add(2, 'M').endOf('M');
        break;
      case 3:
        _fromDate = moment(fromDate).subtract(5, 'M');
        _toDate = moment(_fromDate).add(5, 'M').endOf('M');
        break;
      case 4:
        _fromDate = moment(fromDate).subtract(1, 'y');
        _toDate = moment(_fromDate).endOf('y');
        break;
      default:
        break;
    }
    if (_fromDate) {
      setFromDate(_fromDate?.format(dateFormat));
    }
    if (moment(_toDate).isAfter(new Date())) {
      setToDate(undefined);
    } else {
      setToDate(_toDate?.format(dateFormat));
    }
  };

  return (
    <>
      <View style={rootStyles.containerStyle}>
        <View style={rootStyles.accountWrapperStyle}>
          <TouchableOpacity
            style={rootStyles.accountContainerStyle}
            activeOpacity={0.8}
            onPress={() => setShowSelectAccount(true)}
          >
            <View style={innerStyle.accountNames}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={rootStyles.accountNameTextStyle}>
                {selectedWallets?.length === Root.props.wallets.length
                  ? i18n?.t('cash_flow.lbl_all_accounts') ?? 'All Accounts'
                  : selectedWallets?.map((w) => w.walletName).join(', ')}
              </Text>
            </View>
            <ArrowDownIcon size={12} color={colors.primaryColor} />
          </TouchableOpacity>
        </View>
        <Text style={rootStyles.dateRangeTitleStyle}>{getShowDate()}</Text>
        <View style={chartStyles.containerStyle}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={chartStyles.previousButtonStyle}
            onPress={handlePrevious}
          >
            {Chart?.components?.previousIcon ?? (
              <PreviousIcon size={28} color={colors.primaryColor} />
            )}
          </TouchableOpacity>
          <BarChart
            data={barData}
            height={Chart?.props?.height ?? 120}
            width={Dimensions.get('window').width - 100}
            barBorderRadius={Chart?.props?.barBorderRadius ?? 5}
            barWidth={Chart?.props?.barWidth ?? 12}
            spacing={Chart?.props?.spacing ?? 24}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={1}
            yAxisThickness={1}
            yAxisColor={Chart?.props?.axisLineColor ?? '#CCCCCC'}
            xAxisColor={Chart?.props?.axisLineColor ?? '#CCCCCC'}
            yAxisTextStyle={{
              color: '#000000',
              fontSize: 10,
              textAlign: 'right',
              marginRight: 2,
              fontFamily: fonts.regular,
            }}
            verticalLinesZIndex={1}
            yAxisLabelWidth={50}
            initialSpacing={50}
            noOfSections={Chart?.props?.noOfSections ?? 5}
            showFractionalValues
            isAnimated
            formatYLabel={shortAmount}
          />
          <View style={chartStyles.legendContainerStyle}>
            <LegendComponent
              style={Chart?.styles}
              color={Chart?.props?.moneyInColor ?? '#1AA367'}
              label={Legend?.props?.moneyInTitle ?? i18n?.t('cash_flow.lbl_money_in') ?? 'Money In'}
            />
            <View style={chartStyles.legendSeparatorStyle} />
            <LegendComponent
              style={Chart?.styles}
              color={Chart?.props?.moneyOutColor ?? '#F1B937'}
              label={
                Legend?.props?.moneyOutTitle ?? i18n?.t('cash_flow.lbl_money_out') ?? 'Money Out'
              }
            />
          </View>
          {!moment(toDate).isSameOrAfter(new Date()) && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={chartStyles.nextButtonStyle}
              onPress={handleNext}
            >
              {Chart?.components?.nextIcon ?? <NextIcon size={28} color={colors.primaryColor} />}
            </TouchableOpacity>
          )}
        </View>
        <Text style={rootStyles.filterTextStyle}>
          {Root.props.filterTitle ?? i18n?.t('cash_flow.lbl_filter') ?? 'Filter By:'}
        </Text>
        <View style={rootStyles.filterContainerStyle}>
          <FilterItemComponent
            label={i18n?.t('cash_flow.lbl_today') ?? 'Today'}
            isSelected={filterIndex === 0}
            onPress={() => handleChangeFilter(0)}
            {...FilterItem?.props}
            style={FilterItem?.styles}
          />
          <FilterItemComponent
            label={i18n?.t('cash_flow.lbl_1_month') ?? '1 Month'}
            isSelected={filterIndex === 1}
            onPress={() => handleChangeFilter(1)}
            {...FilterItem?.props}
            style={FilterItem?.styles}
          />
          <FilterItemComponent
            label={i18n?.t('cash_flow.lbl_3_months') ?? '3 Months'}
            isSelected={filterIndex === 2}
            onPress={() => handleChangeFilter(2)}
            {...FilterItem?.props}
            style={FilterItem?.styles}
          />
          <FilterItemComponent
            label={i18n?.t('cash_flow.lbl_6_months') ?? '6 Months'}
            isSelected={filterIndex === 3}
            onPress={() => handleChangeFilter(3)}
            {...FilterItem?.props}
            style={FilterItem?.styles}
          />
          <FilterItemComponent
            label={i18n?.t('cash_flow.lbl_1_year') ?? '1 Year'}
            isSelected={filterIndex === 4}
            onPress={() => handleChangeFilter(4)}
            {...FilterItem?.props}
            style={FilterItem?.styles}
          />
          <FilterItemComponent
            label={i18n?.t('cash_flow.lbl_custom_date') ?? 'Custom date'}
            isSelected={filterIndex === 5}
            isLast
            onPress={() => {
              setShowDatePicker(true);
            }}
            {...FilterItem?.props}
            style={FilterItem?.styles}
          />
        </View>
      </View>
      <SelectAccountModal
        isVisible={isShowSelectAccount}
        wallets={Root.props.wallets}
        selectedWallets={selectedWallets}
        style={SelectAccount?.styles}
        onClose={() => setShowSelectAccount(false)}
        onApplied={(ws) => {
          setShowSelectAccount(false);
          setSelectedWallets(ws);
        }}
        {...SelectAccount?.components}
        {...SelectAccount?.props}
      />
      <DateRangePicker
        isVisible={isShowDatePicker}
        maxDate={new Date()}
        onChange={(start, end) => {
          setFromDate(moment(start, 'YYYY-MM-DD').startOf('d').format(dateFormat));
          setToDate(moment(end, 'YYYY-MM-DD').endOf('d').format(dateFormat));
          setFrequency('daily');
          setFilterIndex(5);
          setShowDatePicker(false);
        }}
        onClose={() => setShowDatePicker(false)}
      />
    </>
  );
};

const innerStyle = StyleSheet.create({
  accountNames: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default CashflowComponent;
