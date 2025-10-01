import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TextXL } from '#ui-kit';
import ButtonGoBack from '#ui-kit/ButtonGoBack';

export interface IHeaderSegmented {
  title: text;
  titleSize: number;
  haveTitleFade: boolean;

  leftElement: ReactNode;
  rightElement: ReactNode;
  centerElement: ReactNode;

  paddingHorizontal: number;
  paddingBottom: number;
  paddingTop: number;
  containerStyle: StyleProp<ViewStyle>;
}

const HeaderWithThreeSections: React.FC<Partial<IHeaderSegmented>> = ({
  title = 'Header',

  leftElement = <ButtonGoBack />,
  rightElement = null,
  centerElement = null,

  paddingHorizontal = 16,
  paddingBottom = 16,
  paddingTop = 8,
  containerStyle,
}) => {
  const insets = useSafeAreaInsets();

  const styles = getStyles({
    paddingTop: insets.top + paddingTop,
    paddingBottom,
    paddingHorizontal,
  });

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.iconContainer}>
        <View style={styles.leftSide}>{leftElement}</View>
      </View>

      <View style={styles.centerSide}>
        {centerElement ? (
          centerElement
        ) : (
          <TextXL
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </TextXL>
        )}
      </View>

      <View style={styles.iconContainer}>
        <View style={styles.rightSide}>{rightElement}</View>
      </View>
    </View>
  );
};

const getStyles = ({
  paddingTop,
  paddingBottom,
  paddingHorizontal,
}: {
  paddingHorizontal: number;
  paddingBottom: number;
  paddingTop: number;
}) =>
  StyleSheet.create({
    wrapper: {
 
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop,
      paddingBottom,
      paddingHorizontal: paddingHorizontal,
    },
    iconContainer: {
      flex: 1,
      alignItems: 'center',
    },
    leftSide: {
      flexDirection: 'row',
      marginRight: 'auto',
    },
    rightSide: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginLeft: 'auto',
    },
    centerSide: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      flexWrap: 'nowrap',
    },
  });

export default React.memo(HeaderWithThreeSections);
