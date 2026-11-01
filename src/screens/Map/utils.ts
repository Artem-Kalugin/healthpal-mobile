import { distance, point } from '@turf/turf';

import { BEMedicalCenterResponseDto } from '#generated/__entities';

export const getMedicalCentersAveragePoint = (
  medicalCenters: BEMedicalCenterResponseDto[],
) => {
  const sum = medicalCenters.reduce(
    (acc, el) => ({ lat: acc.lat + el.lat, lon: acc.lon + el.lon }),
    { lat: 0, lon: 0 },
  );

  return {
    lat: sum.lat / medicalCenters.length,
    lon: sum.lon / medicalCenters.length,
  };
};

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
