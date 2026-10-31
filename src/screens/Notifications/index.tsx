import React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import { NotificationItem } from '#components/domain/notification/Item';
import { HeaderWithThreeSections } from '#components/infrastructure';

import { TextBase, TextSmall } from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { headerShadow } from '#config';
import { colors } from '#config/colors';

import { useFormatters, useTranslation } from '#i18n';

import { notifications } from './config';
import { formatNotificationDate } from './utils';

export const Notifications: React.FC<
  MainScreenProps<MainRoutes.Notifications>
> = props => {
  const { t } = useTranslation();
  const { formatDate } = useFormatters();

  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, headerShadow]}
        title={t('notifications.title')}
        titleTextAlign="center"
      />

      <SectionList
        stickySectionHeadersEnabled
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <TextSmall textAlign="center">
              {t('notifications.mockHint')}
            </TextSmall>
          </View>
        }
        renderItem={({ item }) => (
          <NotificationItem
            item={{ ...item, title: t(item.title), text: t(item.text) }}
          />
        )}
        renderSectionFooter={() => <View style={styles.sectionFooterSpacer} />}
        renderSectionHeader={({ section }) => (
          <TextBase
            style={styles.sectionTitle}
            weight="400"
          >
            {formatNotificationDate(section.title, formatDate)}
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
