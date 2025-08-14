import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ConfigSlice = createSlice({
  name: "config",
  initialState: {
    hideBottomNav: false,
    bottomNavHeight: 0,
  },
  reducers: {
    setHideBottomNav: (state, action: PayloadAction<boolean>) => {
      state.hideBottomNav = action.payload;
    },
    setBottomNavHeight: (state, action: PayloadAction<number>) => {
      state.bottomNavHeight = action.payload;
    }
  },
});

export const ConfigActions = { ...ConfigSlice.actions };

export default ConfigSlice.reducer;
