import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '#store';

export const FavoritesRemoved = createEntityAdapter<{
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

export default FavoritesRemovedSlice.reducer;
export const FavoritesRemovedActions = FavoritesRemovedSlice.actions;
export const FavoritesRemovedSelectors =
  FavoritesRemoved.getSelectors<RootState>(state => state.favoritesRemoved);
