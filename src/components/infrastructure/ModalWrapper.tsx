import React, { ReactNode, useMemo } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '#ui-kit';

import { colors, hitSlopBig, SCREEN_HEIGHT, SCREEN_WIDTH } from '#config';

import FocusAwareStatusBar from './FocusAwareStatusBar';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export interface IModalWrapper {
  visible: boolean;
  children: ReactNode;
  onClose?: () => void;
  isClosable: boolean;
  style: StyleProp<ViewStyle>;
  containerStyle: StyleProp<ViewStyle>;
  contentContainerStyle: StyleProp<ViewStyle>;
}

const ModalWrapper: React.FC<Partial<IModalWrapper>> = ({
  visible = true,
  onClose = () => {},
  isClosable = true,
  children,
  style = {},
  containerStyle = {},
  contentContainerStyle = {},
}) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets.bottom);
  const y = useSharedValue(0);

  const closeModal = async () => {
    if (isClosable) {
      onClose();
    }
  };

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .hitSlop(hitSlopBig)
        .onChange(event => {
          y.value = event.translationY / 1.5;
          if (y.value < 0) {
            y.value = 0;
          }
        })
        .onEnd(event => {
          const shouldClose = event.translationY > 100 || event.velocityY > 800;

          if (shouldClose && isClosable) {
            y.value = withTiming(SCREEN_HEIGHT, undefined, () =>
              runOnJS(closeModal)(),
            );
            return;
          }
          y.value = withTiming(0);
        }),
    [isClosable],
  );

  const rTranslation = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: y.value,
      },
    ],
  }));

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.modal, StyleSheet.flatten(style)]}>
      <FocusAwareStatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Animated.View style={[styles.modal, rTranslation]}>
        <AnimatedTouchableOpacity
          activeOpacity={1}
          entering={FadeIn}
          exiting={FadeOut}
          style={StyleSheet.absoluteFill}
          onPress={closeModal}
        />

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.avoidKeyboardContainer}
        >
          <Animated.View
            entering={SlideInDown.springify().mass(0.5)}
            exiting={SlideOutDown.springify().stiffness(0)}
            style={[styles.content, containerStyle]}
          >
            <GestureDetector gesture={gesture}>
              <Pressable
                hitSlop={hitSlopBig}
                style={styles.shape}
              />
            </GestureDetector>

            {isClosable && (
              <TouchableOpacity
                hitSlop={hitSlopBig}
                style={styles.cross}
                onPress={closeModal}
              >
                <Icon name="cross" />
              </TouchableOpacity>
            )}

            <View style={[styles.innerContainer, contentContainerStyle]}>
              {children}
            </View>
            <View style={styles.bottomOverlayContainer}>
              <View style={styles.bottomOverlay} />
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.backdrop, StyleSheet.absoluteFill]}
      />
    </View>
  );
};

const getStyles = (insetsBottom: number) =>
  StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: 'flex-end',
      zIndex: 100,
    },
    // eslint-disable-next-line react-native/no-color-literals
    backdrop: {
      zIndex: 0,
      backgroundColor: '#00000099',
    },
    avoidKeyboardContainer: {
      maxHeight: '90%',
      justifyContent: 'flex-end',
    },
    content: {
      maxHeight: '100%',
      paddingBottom: 20,
      backgroundColor: colors.white,
      borderTopLeftRadius: 34,
      borderTopRightRadius: 34,
    },
    innerContainer: {
      maxHeight: '100%',
      paddingTop: 16,
      paddingBottom: insetsBottom,
      paddingHorizontal: 16,
    },
    bottomOverlayContainer: {
      height: 0,
      position: 'absolute',
      bottom: 0,
    },
    bottomOverlay: {
      height: `${SCREEN_HEIGHT}` as unknown as number,
      width: `${SCREEN_WIDTH}` as unknown as number,
      top: -1,
      backgroundColor: colors.white,
    },
    shape: {
      height: 4,
      width: 35,
      alignSelf: 'center',
      zIndex: 1000,
      marginTop: 8,
      marginBottom: 0,
      borderRadius: 2,
      backgroundColor: colors.black,
    },
    cross: {
      position: 'absolute',
      zIndex: 100,
      top: 30,
      right: 16,
    },
  });

export default React.memo(ModalWrapper);
