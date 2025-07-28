import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./slices/users.slice";
import ConfigReducer from "./slices/config.slice";

const rootReducer = combineReducers({
  user: UserReducer,
  config: ConfigReducer
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
