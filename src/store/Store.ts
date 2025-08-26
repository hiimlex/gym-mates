import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AddWorkoutReducer from "./slices/AddWorkoutSlice";
import ConfigReducer from "./slices/ConfigSlice";
import CreateCrewReducer from "./slices/CreateCrewSlice";
import CrewsReducer from "./slices/CrewsSlice";
import DialogReducer from "./slices/DialogSlice";
import NotifierReducer from "./slices/NotifierSlice";
import ShopReducer from "./slices/ShopSlice";
import UserInventoryReducer from "./slices/UserInventorySlice";
import UserReducer from "./slices/UserSlice";
import OverlayReduce from "./slices/OverlaySlice";

const rootReducer = combineReducers({
  user: UserReducer,
  config: ConfigReducer,
  crews: CrewsReducer,
  dialog: DialogReducer,
  addWorkout: AddWorkoutReducer,
  shop: ShopReducer,
  userInventory: UserInventoryReducer,
  createCrew: CreateCrewReducer,
  notifier: NotifierReducer,
  overlay: OverlayReduce,
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
