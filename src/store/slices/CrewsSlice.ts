import { ICrew, ICrewRules, ICrewsState } from "@models/collections";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICrewsState = {
  crews: [],
  crewView: undefined,
};

const CrewsSlice = createSlice({
  name: "crews",
  initialState,
  reducers: {
    setCrews: (state, action) => {
      state.crews = action.payload;
    },
    setCrewView: (state, action: PayloadAction<ICrew | undefined>) => {
      state.crewView = action.payload;
    },
    setRules: (state, action: PayloadAction<Partial<ICrewRules>>) => {
      if (state.mergedRules) {
        state.mergedRules = { ...state.mergedRules, ...action.payload };
      }

      if (!state.mergedRules) {
        state.mergedRules = action.payload as ICrewRules;
      }
    },
  },
  extraReducers: (builder) => {
    // Add any async thunks or additional cases here if needed
  },
});

export const CrewsActions = { ...CrewsSlice.actions };
export default CrewsSlice.reducer;
