import { distance, point } from '@turf/turf';

import { BEMedicalCenterResponseDto } from '#generated/__entities';

export const getSortedMedicalCentersByDistance = (
  medicalCenters: BEMedicalCenterResponseDto[],
  lat: number,
  lon: number,
) => {
  return [...medicalCenters]
    .map(el => {
      return {
        ...el,
        dist: distance(point([el.lat, el.lon]), point([lat, lon])),
      };
    })
    .sort((a, b) => a.dist - b.dist);
};

export const CENTER_ON_MARKER_DISTANCE_THRESHOLD = 0.001;
