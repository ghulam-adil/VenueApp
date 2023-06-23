import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import migration, { storeVersion } from "./migration";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import home from "./home";

export const persistConfig = {
  key: "propertyservices-storage-root",
  storage: AsyncStorage,
  //   version: storeVersion,
  debug: __DEV__,
  blacklist: ["general"],
  stateReconciler: autoMergeLevel2,
  //   migrate: createMigrate(
  //     {
  //       [storeVersion]: migration,
  //     },
  //     { debug: __DEV__ }
  //   ),
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
