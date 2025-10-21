import React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import { NotifcationItem } from '#components/domain/Notification/Item';
import HeaderWithThreeSections from '#components/infrastructure/HeaderWithThreeSections';

import { TextBase, TextSmall } from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { colors, headerShadow } from '#config';

import { notifications } from './config';
import { formatNotificationDate } from './utils';

export const Notifications: React.FC<
  MainScreenProps<MainRoutes.Notifications>
> = props => {
  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, headerShadow]}
        title="Уведомления"
        titleTextAlign="center"
      />

      <SectionList
        stickySectionHeadersEnabled
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <TextSmall textAlign="center">
              Здесь отображаются тестовые нотификации
            </TextSmall>
          </View>
        }
        renderItem={({ item }) => <NotifcationItem item={item} />}
        renderSectionFooter={() => <View style={styles.sectionFooterSpacer} />}
        renderSectionHeader={({ section }) => (
          <TextBase
            style={styles.sectionTitle}
            weight="400"
          >
            {formatNotificationDate(section.title)}
          </TextBase>
        )}
        sections={notifications}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    padding: 24,
  },
  headerContainer: {
    paddingHorizontal: 24,
    borderBottomColor: colors.grayscale['200'],
    borderBottomWidth: 1,
  },
  sectionFooterSpacer: {
    paddingVertical: 8,
  },
  sectionTitle: {
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    textTransform: 'uppercase',
    backgroundColor: colors.main.white,
  },
});
