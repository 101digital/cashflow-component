import React, { useContext } from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { FilterItemStyle } from '../../types';
import useMergeStyles from './theme';

interface ComponentProps {
  label: string;
  isSelected: boolean;
  isLast?: boolean;
  itemSpace?: number;
  activeColor?: string;
  inActiveColor?: string;
  style?: FilterItemStyle;
}

export type FilterItemProps = ComponentProps & TouchableOpacityProps;

const FilterItemComponent = ({
  label,
  isSelected,
  isLast,
  itemSpace,
  activeColor,
  inActiveColor,
  style,
  ...restProps
}: FilterItemProps) => {
  const { colors } = useContext(ThemeContext);
  const styles: FilterItemStyle = useMergeStyles(style);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.containerStyle,
        {
          borderColor: isSelected ? activeColor ?? colors.primaryColor : inActiveColor ?? '#EFEFEF',
          backgroundColor: isSelected ? activeColor ?? colors.primaryColor : 'white',
        },
        !isLast && { marginRight: itemSpace ?? 10 },
      ]}
      {...restProps}
    >
      <Text style={isSelected ? styles.activeLabelStyle : styles.inActiveLabelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

FilterItemComponent.defaultProps = {
  isSelected: false,
};

export default FilterItemComponent;
