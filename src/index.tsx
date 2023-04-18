import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomescreenPage from "./components/homescreen/HomescreenPage";
import PageNotFoundPage from "./components/pagenotfound/PageNotFoundPage";
import "./style/themes/default";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomescreenPage />,
    errorElement: <PageNotFoundPage />,
    children: [
      {
        path: "test",
        element: <div>test</div>,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
