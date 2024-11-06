import ReactDOM from "react-dom/client";
import appRouter from "components/appRouter";
import { RouterProvider } from "react-router-dom";
import "asset/style/app.css";
import { ConfigProvider, Spin } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientId } from "env/const";
import axios from "axios";
import { Provider } from "react-redux";
import { getPersistor, getStore } from "service/business/RootBusinessStore";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = getStore();
const persistor = getPersistor();

root.render(
  <Provider store={store}>
    <PersistGate loading={<Spin />} persistor={persistor}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#6096BA",
            colorText: "#274C77",
            colorInfo: "#A3CEF1",
            colorWarning: "#f8d410",
            colorError: "#c9424d",
            fontFamily: "Verdana",
            fontSize: 16,
          },
        }}
      >
        <GoogleOAuthProvider clientId={googleClientId}>
          <RouterProvider router={appRouter} />
        </GoogleOAuthProvider>
      </ConfigProvider>
    </PersistGate>
  </Provider>
);
