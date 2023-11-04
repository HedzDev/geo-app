import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.value.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.value = state.value.filter(
        (favorite) => favorite.name !== action.payload.name
      );
    },
    removeAllFavorites: (state, action) => {
      state.value = [];
    },
  },
});

export const { addFavorite, removeFavorite, removeAllFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
