import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TextSmall, TextXL } from '#ui-kit';
import ButtonGoBack from '#ui-kit/ButtonGoBack';

export interface IHeaderSegmented {
  title: text;
  subtitle?: text;
  titleTextAlign: TextStyle['textAlign'];
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
  subtitle,
  titleTextAlign = 'left',
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
          <>
            <TextXL
              numberOfLines={1}
              style={styles.title}
              textAlign={titleTextAlign}
              weight="600"
            >
              {title}
            </TextXL>
            {subtitle && (
              <TextSmall
                textAlign="center"
                weight="400"
              >
                {subtitle}
              </TextSmall>
            )}
          </>
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
      alignItems: 'center',
      paddingTop,
      paddingBottom,
      paddingHorizontal: paddingHorizontal,
      gap: 14,
    },
    iconContainer: {
      minWidth: 24,
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
      flex: 1,
      alignItems: 'center',
      gap: 4,
    },
    title: {
      flexWrap: 'nowrap',
    },
  });

export default React.memo(HeaderWithThreeSections);
