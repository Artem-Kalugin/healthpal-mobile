import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { AppointmentCard } from '#components/entities/Appointment/Card';
import ListExtender from '#components/ListExtender';

import { Button } from '#ui-kit';

import {
  AppointmentsRoutes,
  AppointmentsScreenProps,
} from '#navigation/Main/Tab/Appointments/types';

import { BORDER_RADIUS_ROUNDED } from '#config';

export const Appointments: React.FC<
  AppointmentsScreenProps<AppointmentsRoutes>
> = props => {
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]}
        keyboardShouldPersistTaps="never"
        ListFooterComponent={<ListExtender height={36} />}
        renderItem={() => (
          <View style={styles.cardWrapper}>
            <AppointmentCard
              Footer={
                <View style={styles.cardFooter}>
                  <Button
                    size="small"
                    style={styles.cardFooterButton}
                    type="secondary"
                  >
                    Отмена
                  </Button>
                  <Button
                    size="small"
                    style={styles.cardFooterButton}
                  >
                    Перенести
                  </Button>
                </View>
              }
            />
          </View>
        )}
        style={styles.container}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  cardFooterButton: {
    borderRadius: BORDER_RADIUS_ROUNDED,
  },
});
