import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import MapScreen from "./src/screens/home/MapScreen";
import { persistor, store } from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MapScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
