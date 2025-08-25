import {
  ICreateCrewSettingsForm,
  ICreateCrewInfoForm,
  ICreateCrewState,
  ICreateCrewSteps,
} from "@models/collections";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "react-native-image-picker";

const initialState: ICreateCrewState = {
  step: "info",
  
};

const CreateCrewSlice = createSlice({
  name: "createCrew",
  initialState,
  reducers: {
    setInfoForm: (
      state,
      action: PayloadAction<
        ICreateCrewInfoForm & { media?: Asset; mediaPreview?: string }
      >
    ) => {
      state.infoForm = action.payload;
    },
    setSettingsForm: (state, action: PayloadAction<ICreateCrewSettingsForm>) => {
      state.settingsForm = action.payload;
    },
    setStep: (state, action: PayloadAction<ICreateCrewSteps>) => {
      state.step = action.payload;
    },
  },
});

export const CreateCrewActions = CreateCrewSlice.actions;

export default CreateCrewSlice.reducer;
