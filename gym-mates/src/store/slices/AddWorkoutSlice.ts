import { IAddWorkoutState, ICreateWorkoutForm } from "@models/collections";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "react-native-image-picker";

const initialState: IAddWorkoutState = {};

const AddWorkoutSlice = createSlice({
  name: 'addWorkout',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<ICreateWorkoutForm>) => {
      state.formData = action.payload;
    },
    setPicture: (state, action: PayloadAction<Asset | undefined>) => {
      state.picture = action.payload;
    },
    setSharedTo: (state, action: PayloadAction<string[]>) => {
      state.shared_to = action.payload;
    },
    setCreatedWorkout: (state, action: PayloadAction<IAddWorkoutState['createdWorkout']>) => {
      state.createdWorkout = action.payload;
    },
    reset: (state) => {
      state.step = undefined;
      state.formData = undefined;
      state.picture = undefined;
      state.shared_to = [];
      state.createdWorkout = undefined;
    }
  }
});

export const AddWorkoutActions = { ...AddWorkoutSlice.actions };
export default AddWorkoutSlice.reducer;
