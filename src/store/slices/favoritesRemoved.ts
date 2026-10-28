import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '#store';

const FavoritesRemoved = createEntityAdapter<{
  id: string;
}>({});

const FavoritesRemovedSlice = createSlice({
  name: 'favoritesRemoved',
  initialState: FavoritesRemoved.getInitialState(),
  reducers: {
    upsertOne: FavoritesRemoved.upsertOne,
    deleteAll: FavoritesRemoved.removeAll,
    deleteOne: FavoritesRemoved.removeOne,
    upsertMany: FavoritesRemoved.upsertMany,
    setAll: FavoritesRemoved.setAll,
  },
});

export const favoritesRemovedReducer = FavoritesRemovedSlice.reducer;
export const FavoritesRemovedActions = FavoritesRemovedSlice.actions;
export const FavoritesRemovedSelectors =
  FavoritesRemoved.getSelectors<RootState>(state => state.favoritesRemoved);
