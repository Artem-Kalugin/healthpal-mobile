import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { BORDER_RADIUS_ROUNDED, colors } from '#config';

import { Icon, IconNames, IIcon } from './Icon';
import { TextSmall } from './Text';

interface IStatisticsFact extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  icon: IconNames;
  iconProps?: Partial<IIcon>;
  label: string;
  value: string;
}

export const StatisticsFact = ({
  style,
  icon,
  iconProps,
  label,
  value,
}: IStatisticsFact) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <View style={styles.iconContainer}>
        <Icon
          {...iconProps}
          fill={colors.main.midnightBlue}
          name={icon}
        />
      </View>
      <TextSmall
        color={colors.grayscale['600']}
        weight="600"
      >
        {value}
      </TextSmall>
      <TextSmall
        color={colors.grayscale['500']}
        weight="400"
      >
        {label}
      </TextSmall>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 2,
  },
  iconContainer: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS_ROUNDED,
    backgroundColor: colors.grayscale['100'],
  },
});
