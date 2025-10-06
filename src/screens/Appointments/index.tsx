import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { AppointmentCard } from '#components/entities/Appointment/Card';
import { HeaderTabs } from '#components/HeaderTabs';
import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import ListExtender from '#components/ListExtender';

import { Button } from '#ui-kit';

import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';

import { BORDER_RADIUS_ROUNDED, colors, shadow } from '#config';

export const Appointments: React.FC<
  TabScreenProps<TabRoutes.Appointments>
> = props => {
  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={styles.headerContainer}
        leftElement={null}
        title="Мои записи"
        titleTextAlign="center"
      />

      <HeaderTabs
        data={['Будущие', 'Прошедшие', 'Отменены']}
        style={[styles.tabsContainer, shadow]}
      />

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

  headerContainer: {
    zIndex: 2,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale['200'],
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
