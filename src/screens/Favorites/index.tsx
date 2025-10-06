import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { AppointmentCard } from '#components/entities/Appointment/Card';
import { DoctorCard } from '#components/entities/Doctor/Card';
import { MedicalCenterCard } from '#components/entities/MedicalCenter/Card';
import { HeaderTabs } from '#components/HeaderTabs';
import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import ListExtender from '#components/ListExtender';

import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';

import { BORDER_RADIUS_ROUNDED, colors, shadow } from '#config';

export const Favorites: React.FC<TabScreenProps<TabRoutes.Profile>> = props => {
  const [activeTab, setActiveTab] = useState('Врачи');
  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={styles.headerContainer}
        title="Избранное"
        titleTextAlign="center"
      />

      <HeaderTabs
        activeItem={activeTab}
        data={['Врачи', 'Мед. центры']}
        style={[styles.tabsContainer, shadow]}
        onPress={setActiveTab}
      />

      <Animated.FlatList
        data={[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]}
        keyboardShouldPersistTaps="never"
        ListFooterComponent={<ListExtender height={36} />}
        renderItem={() => (
          <View style={styles.cardWrapper}>
            {activeTab === 'Врачи' ? (
              <DoctorCard />
            ) : (
              <MedicalCenterCard style={styles.medicalCenterCard} />
            )}
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
  medicalCenterCard: {
    width: '100%',
  },
});
