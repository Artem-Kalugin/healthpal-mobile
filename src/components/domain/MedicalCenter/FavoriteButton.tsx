import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { Icon } from '#ui-kit';

import {
  useAddMedicalCenterMutation,
  useRemoveMedicalCenterMutation,
} from '#api/Favorites';

import { colors, hitSlop } from '#config';

import { useDispatch, useSelector } from '#store';
import {
  FavoritesAddedActions,
  FavoritesAddedSelectors,
} from '#store/slices/favoritesAdded';
import {
  FavoritesRemovedActions,
  FavoritesRemovedSelectors,
} from '#store/slices/favoritesRemoved';

type FavoriteButtonProps = {
  medicalCenterId: string;
  isFavoriteOnBackend?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  medicalCenterId,
  isFavoriteOnBackend = false,
  style,
}) => {
  const dispatch = useDispatch();

  const isAddedToFavorites = useSelector(store =>
    FavoritesAddedSelectors.selectById(store, medicalCenterId),
  );
  const isRemovedFromFavorites = useSelector(store =>
    FavoritesRemovedSelectors.selectById(store, medicalCenterId),
  );

  const isInFavorite = isAddedToFavorites
    ? true
    : isRemovedFromFavorites
      ? false
      : isFavoriteOnBackend;

  const [addMedicalCenterToFavorite, addDoctorMeta] =
    useAddMedicalCenterMutation();
  const [removeMedicalCenterFromFavorite, removeDoctorMeta] =
    useRemoveMedicalCenterMutation();

  const isLoading = addDoctorMeta.isLoading || removeDoctorMeta.isLoading;

  const handlePress = async () => {
    if (isLoading) {
      return;
    }
    const payload = { path: { medicalCenterId } };
    try {
      if (isInFavorite) {
        await removeMedicalCenterFromFavorite(payload).unwrap();
        dispatch(FavoritesRemovedActions.upsertOne({ id: medicalCenterId }));
        dispatch(FavoritesAddedActions.deleteOne(medicalCenterId));
      } else {
        await addMedicalCenterToFavorite(payload).unwrap();
        dispatch(FavoritesAddedActions.upsertOne({ id: medicalCenterId }));
        dispatch(FavoritesRemovedActions.deleteOne(medicalCenterId));
      }
    } catch {}
  };

  return (
    <TouchableOpacity
      hitSlop={hitSlop}
      style={[StyleSheet.flatten(style), isLoading && styles.active]}
      onPress={handlePress}
    >
      <Icon
        color={colors.white}
        name={isInFavorite ? 'favoriteActive' : 'favorite'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  active: {
    opacity: 0.2,
  },
});
