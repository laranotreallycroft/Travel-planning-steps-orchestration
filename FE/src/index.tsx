import React from "react";
import ReactDOM from "react-dom/client";
import appRouter from "./components/appRouter";
import { RouterProvider } from "react-router-dom";
import "./asset/style/app.css";
import { ConfigProvider } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientId } from "./env/const";
import axios from "axios";
import { Provider } from "react-redux";
import { getPersistor, getStore } from "./service/business/RootBusinessStore";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = getStore();
const persistor = getPersistor();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#c98e49",
              colorText: "#c98e49",
              colorInfo: "#eae4e1",
              fontFamily: "Verdana",
            },
          }}
        >
          <GoogleOAuthProvider clientId={googleClientId}>
            <RouterProvider router={appRouter} />
          </GoogleOAuthProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
