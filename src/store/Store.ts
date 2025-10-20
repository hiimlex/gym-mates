import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AddWorkoutReducer from "./slices/AddWorkoutSlice";
import CharCreationReducer from "./slices/CharCreationSlice";
import ConfigReducer from "./slices/ConfigSlice";
import CreateCrewReducer from "./slices/CreateCrewSlice";
import CrewsReducer from "./slices/CrewsSlice";
import DialogReducer from "./slices/DialogSlice";
import NotifierReducer from "./slices/NotifierSlice";
import OverlayReducer from "./slices/OverlaySlice";
import ShopReducer from "./slices/ShopSlice";
import UserInventoryReducer from "./slices/UserInventorySlice";
import UserReducer from "./slices/UserSlice";

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
  overlay: OverlayReducer,
  charCreation: CharCreationReducer,
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
