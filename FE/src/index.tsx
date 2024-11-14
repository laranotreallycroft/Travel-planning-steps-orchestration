import { GoogleOAuthProvider } from "@react-oauth/google";
import { Spin } from "antd";
import "asset/style/app.css";
import axios from "axios";
import appRouter from "components/appRouter";
import LocaleProvider from "components/locale/LocaleProvider";
import { googleClientId } from "env/const";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { getPersistor, getStore } from "service/business/RootBusinessStore";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = getStore();
const persistor = getPersistor();

root.render(
  <Provider store={store}>
    <LocaleProvider>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <RouterProvider router={appRouter} />
        </GoogleOAuthProvider>
      </PersistGate>
    </LocaleProvider>
  </Provider>
);
