import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icon, TextXS } from '#ui-kit';

import { shadow } from '#config';
import { colors } from '#config/colors';

import { useTranslation } from '#i18n';

interface IMapLanguageNotice {
  onClose: () => void;
}

export const MapLanguageNotice: React.FC<IMapLanguageNotice> = ({
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, shadow]}>
      <Icon
        name="language"
        size={16}
      />
      <TextXS
        color={colors.grayscale['600']}
        style={styles.text}
      >
        {t('map.mapLanguageNotice')}
      </TextXS>
      <TouchableOpacity
        hitSlop={8}
        onPress={onClose}
      >
        <Icon
          color={colors.grayscale['500']}
          name="cross"
          size={14}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 8,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  text: {
    flexShrink: 1,
  },
});
