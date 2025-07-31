import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./slices/users.slice";
import ConfigReducer from "./slices/config.slice";
import CrewsReducer from "./slices/crews.slice";
import DialogReducer from "./slices/dialog.slice";
import AddWorkoutReducer from "./slices/addWorkout.slice";

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
