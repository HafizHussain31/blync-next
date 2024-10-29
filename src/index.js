import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import AppRoutes from "./routes";
import "react-notifications/lib/notifications.css";
import "react-datepicker/dist/react-datepicker.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRoutes />
    </PersistGate>
  </Provider>
);
