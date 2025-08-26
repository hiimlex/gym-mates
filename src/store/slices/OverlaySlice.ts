import { IOverlayState, IShowOverlayPayload } from "@models/generic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IOverlayState = {};

const OverlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<IShowOverlayPayload>) => {
      state.showing = action.payload.type;
      state.data = action.payload.data;
    },
    hide: (state) => {
      state.showing = undefined;
      state.data = undefined;
    },
  },
});

export const OverlayActions = OverlaySlice.actions;
export default OverlaySlice.reducer;
