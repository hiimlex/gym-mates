import { CameraState } from "@models/generic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "react-native-image-picker";

const initialState: CameraState = {
  showFullscreen: false,
  showPreview: false,
};

const CameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setAsset(state, action: PayloadAction<Asset | undefined>) {
      state.asset = action.payload;
    },
    clear(state) {
      state.asset = undefined;
      state.showFullscreen = false;
      state.showPreview = false;
    },
  },
});

export const CameraActions = CameraSlice.actions;
export default CameraSlice.reducer;
