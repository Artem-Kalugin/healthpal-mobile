import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '#store';

const FavoritesAddedAdapter = createEntityAdapter<{
  id: string;
}>({});

const FavoritesAddedSlice = createSlice({
  name: 'favoriteAdded',
  initialState: FavoritesAddedAdapter.getInitialState(),
  reducers: {
    upsertOne: FavoritesAddedAdapter.upsertOne,
    deleteAll: FavoritesAddedAdapter.removeAll,
    deleteOne: FavoritesAddedAdapter.removeOne,
    upsertMany: FavoritesAddedAdapter.upsertMany,
    setAll: FavoritesAddedAdapter.setAll,
  },
});

export default FavoritesAddedSlice.reducer;
export const FavoritesAddedActions = FavoritesAddedSlice.actions;
export const FavoritesAddedSelectors =
  FavoritesAddedAdapter.getSelectors<RootState>(state => state.favoritesAdded);
