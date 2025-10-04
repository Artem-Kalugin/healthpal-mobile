import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import ModalWrapper from '#components/ModalWrapper';

import { Button, Text } from '#ui-kit';

import { ModalsRoutes, ModalsScreenProps } from '#navigation/Modals/types';
import { AppParamList } from '#navigation/types';

import useModal from '#hooks/utils/useModal';

export const Dialog: React.FC<ModalsScreenProps<ModalsRoutes.Dialog>> = ({
  route,
}) => {
  const modal = useModal(true);
  const navigation = useNavigation();

  return (
    <ModalWrapper
      visible={modal.visible}
      onClose={route.params?.onClose}
      setVisible={modal.setVisible}
    >
      <Text style={styles.title}>{route.params?.title}</Text>

      <Text style={styles.text}>{route.params.text}</Text>

      <View style={styles.buttons}>
        <Button
          {...route.params.confirmButtonProps}
          onPress={() => {
            route.params.confirmButtonProps.onPress &&
              route.params.confirmButtonProps.onPress(
                navigation as unknown as StackNavigationProp<AppParamList>,
                modal,
              );
          }}
        />

        {route.params.declineButtonProps && (
          <Button
            {...route.params.declineButtonProps}
            onPress={() => {
              route?.params?.declineButtonProps?.onPress &&
                route.params.declineButtonProps.onPress(
                  navigation as unknown as StackNavigationProp<AppParamList>,
                  modal,
                );
            }}
          />
        )}
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24,
    fontWeight: '400',
  },
  title: {
    marginBottom: 12,

    fontSize: 22,
  },
  buttons: {
    gap: 12,
  },
});
