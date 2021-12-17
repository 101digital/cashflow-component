import React from 'react';
import { View, Text } from 'react-native';
import { LegendStyle } from '../../types';
import useMergeStyles from './theme';

interface LegendComponentProps {
  color: string;
  label: string;
  style?: LegendStyle;
}

const LegendComponent = ({ color, label, style }: LegendComponentProps) => {
  const styles: LegendStyle = useMergeStyles(style);
  return (
    <View style={styles.containerStyle}>
      <View style={[styles.dotStyle, { backgroundColor: color }]} />
      <Text style={styles.labelStyle}>{label}</Text>
    </View>
  );
};

export default LegendComponent;
