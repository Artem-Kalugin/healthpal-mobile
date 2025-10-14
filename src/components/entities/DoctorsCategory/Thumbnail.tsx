import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SvgXml } from 'react-native-svg';

import { TextXS } from '#ui-kit';

import { ActiveOpacities, MapDoctorCategoryToColor, shadow } from '#config';
import { MapDoctorCategoryToLabel } from '#config/locale';

import { BEDoctorCategoryResponseDto } from '#generated/__entities';

type IDoctorsCategoryThumbnail = {
  item: BEDoctorCategoryResponseDto;
  onPress: () => void;
};

export const DoctorsCategoryThumbnail: React.FC<IDoctorsCategoryThumbnail> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={ActiveOpacities.HEAVY}
      style={styles.container}
      onPress={onPress}
    >
      <View
        style={[
          styles.icon,
          shadow,
          { backgroundColor: MapDoctorCategoryToColor[item.type] },
        ]}
      >
        <View style={styles.iconTopLeftAnchor}>
          <SvgXml
            xml={`<svg
                fill="none"
                height="34"
                viewBox="0 0 34 34"
                width="34"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34 0C34 4.46494 33.1206 8.88617 31.4119 13.0112C29.7032 17.1363 27.1988 20.8844 24.0416 24.0416C20.8844 27.1988 17.1363 29.7032 13.0112 31.4119C8.88617 33.1206 4.46494 34 0 34V0H34Z"
                  fill="white"
                  fillOpacity="0.2"
                />
              </svg>`}
          />
        </View>
        <SvgXml xml={item.icon!} />
      </View>
      <TextXS
        numberOfLines={1}
        style={styles.text}
        weight="700"
      >
        {MapDoctorCategoryToLabel[item.type]}
      </TextXS>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    maxWidth: 68,
    fontSize: 10,
  },
  container: {
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    height: 68,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  iconTopLeftAnchor: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
