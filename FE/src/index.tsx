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
import { getStore } from "./service/business/RootBusinessStore";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = getStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#c98e49",
            colorText: "#c98e49",
            colorInfo: "#12374e",
            fontFamily: "Verdana",
          },
        }}
      >
        <GoogleOAuthProvider clientId={googleClientId}>
          <RouterProvider router={appRouter} />
        </GoogleOAuthProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
