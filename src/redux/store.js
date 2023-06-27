import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import home from "./home";

export const persistConfig = {
  key: "propertyservices-storage-root",
  storage: AsyncStorage,
  debug: __DEV__,
  blacklist: ["general"],
  stateReconciler: autoMergeLevel2,
};

const reducers = combineReducers({
  home: home,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat([thunk]);
  },
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
