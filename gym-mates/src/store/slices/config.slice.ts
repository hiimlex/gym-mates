import { createSlice } from "@reduxjs/toolkit";

const ConfigSlice = createSlice({
  name: "config",
  initialState: {
    hideBottomNav: false,
  },
  reducers: {
    setHideBottomNav: (state, action) => {
      state.hideBottomNav = action.payload;
    },
  },
});

export const ConfigActions = { ...ConfigSlice.actions };

export default ConfigSlice.reducer;
