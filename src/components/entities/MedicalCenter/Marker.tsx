import React from 'react';

import { Marker } from 'react-native-yamap';

import { Icon } from '#ui-kit';

import { BEMedicalCenterResponseDto } from '#generated/__entities';

type IMedicalCenterMarker = {
  item: BEMedicalCenterResponseDto;
  onPress: () => void;
};

const _MedicalCenterMarker: React.FC<IMedicalCenterMarker> = ({
  item,
  onPress,
}) => {
  return (
    <Marker
      point={item}
      onPress={onPress}
    >
      <Icon
        name="hospitalHeart"
        size={46}
      />
    </Marker>
  );
};

export const MedicalCenterMarker = React.memo(
  _MedicalCenterMarker,
  (props, nextProps) => {
    return (
      props.item.lat === nextProps.item.lat &&
      props.item.lon === nextProps.item.lon
    );
  },
);
