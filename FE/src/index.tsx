import React from "react";
import ReactDOM from "react-dom/client";
import appRouter from "./components/appRouter";
import { RouterProvider } from "react-router-dom";
import "./asset/style/app.css";
import { ConfigProvider } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientId } from "./env/const";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
