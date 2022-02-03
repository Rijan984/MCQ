import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Reducer from "./features/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, Reducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
let persistor = persistStore(store);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,

  document.getElementById("root")
);

reportWebVitals();
