import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import DatePicker from 'react-native-date-picker';

import ModalWrapper from '#components/infrastructure/ModalWrapper';

import { Button, TextXL } from '#ui-kit';

import { ModalsRoutes, ModalsScreenProps } from '#navigation/Modals/types';

import useModal from '#hooks/useModalState';

export const DateTimePicker: React.FC<
  ModalsScreenProps<ModalsRoutes.DateTimePicker>
> = props => {
  const modal = useModal(true);
  const [date, setDate] = useState(props.route.params.pickerProps.date);

  return (
    <ModalWrapper
      contentContainerStyle={styles.modal}
      visible={modal.visible}
      setVisible={modal.setVisible}
    >
      <TextXL
        style={styles.title}
        weight="600"
      >
        {props.route.params.title || 'Выберите время'}
      </TextXL>

      <DatePicker
        {...props.route.params.pickerProps}
        date={date}
        locale="ru"
        style={styles.dateTimePicker}
        onDateChange={setDate}
      />

      <Button
        style={styles.button}
        onPress={() => {
          props.route.params.onEnd && props.route.params.onEnd(date);
          modal.close();
        }}
      >
        Выбрать
      </Button>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  dateTimePicker: {
    marginBottom: 20,
  },
  modal: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
});
