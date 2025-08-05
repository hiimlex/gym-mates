import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlice";
import ConfigReducer from "./slices/ConfigSlice";
import CrewsReducer from "./slices/CrewsSlice";
import DialogReducer from "./slices/DialogSlice";
import AddWorkoutReducer from "./slices/AddWorkoutSlice";

const rootReducer = combineReducers({
  user: UserReducer,
  config: ConfigReducer,
  crews: CrewsReducer,
  dialog: DialogReducer,
  addWorkout: AddWorkoutReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type StoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
