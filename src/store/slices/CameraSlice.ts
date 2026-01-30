import { CameraState } from "@models/generic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImagePickerAsset } from "expo-image-picker";

const initialState: CameraState = {
  showFullscreen: false,
  showPreview: false,
};

const CameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setAsset(state, action: PayloadAction<ImagePickerAsset | undefined>) {
      state.asset = action.payload;
    },
    clear(state) {
      state.asset = undefined;
      state.showFullscreen = false;
      state.showPreview = false;
    },
    setShowPreview(state, action: PayloadAction<boolean>) {
      state.showPreview = action.payload;
    },
    setShowFullscreen(state, action: PayloadAction<boolean>) {
      state.showFullscreen = action.payload;
    },
  },
});

export const CameraActions = CameraSlice.actions;
export default CameraSlice.reducer;
