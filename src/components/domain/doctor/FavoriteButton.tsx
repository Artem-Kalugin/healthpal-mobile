import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { Icon } from '#ui-kit';

import {
  useAddFavoriteDoctorMutation,
  useRemoveFavoriteDoctorMutation,
} from '#api/Doctor';

import { hitSlop } from '#config';

import { useDispatch, useSelector } from '#store';
import {
  FavoritesAddedActions,
  FavoritesAddedSelectors,
} from '#store/slices/favoritesAdded';
import {
  FavoritesRemovedActions,
  FavoritesRemovedSelectors,
} from '#store/slices/favoritesRemoved';

type IDoctorFavoriteButton = {
  doctorId: string;
  isFavoriteOnBackend?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const DoctorFavoriteButton: React.FC<IDoctorFavoriteButton> = ({
  doctorId,
  isFavoriteOnBackend = false,
  style,
}) => {
  const dispatch = useDispatch();

  const isAddedToFavorites = useSelector(store =>
    FavoritesAddedSelectors.selectById(store, doctorId),
  );
  const isRemovedFromFavorites = useSelector(store =>
    FavoritesRemovedSelectors.selectById(store, doctorId),
  );

  const isInFavorite = isAddedToFavorites
    ? true
    : isRemovedFromFavorites
      ? false
      : isFavoriteOnBackend;

  const [addDoctorToFavorite, addDoctorMeta] = useAddFavoriteDoctorMutation();
  const [removeDoctorFromFavorite, removeDoctorMeta] =
    useRemoveFavoriteDoctorMutation();

  const isLoading = addDoctorMeta.isLoading || removeDoctorMeta.isLoading;

  const onToggle = async () => {
    if (isLoading) {
      return;
    }

    const payload = { path: { id: doctorId } };
    try {
      if (isInFavorite) {
        await removeDoctorFromFavorite(payload).unwrap();
        dispatch(FavoritesRemovedActions.upsertOne({ id: doctorId }));
        dispatch(FavoritesAddedActions.deleteOne(doctorId));
      } else {
        await addDoctorToFavorite(payload).unwrap();
        dispatch(FavoritesAddedActions.upsertOne({ id: doctorId }));
        dispatch(FavoritesRemovedActions.deleteOne(doctorId));
      }
    } catch {}
  };

  return (
    <TouchableOpacity
      hitSlop={hitSlop}
      style={[StyleSheet.flatten(style), isLoading && styles.active]}
      onPress={onToggle}
    >
      <Icon name={isInFavorite ? 'favoriteActive' : 'favorite'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  active: {
    opacity: 0.2,
  },
});
