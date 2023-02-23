import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        { path: "/", element: <App />, errorElement: <ErrorPage /> },
        {
          path: "/join",
          element: <div>this is the join page</div>,
        },
        {
          path: "/host",
          element: <div>this is the host page</div>,
        },
        {
          path: "/local",
          element: <div>this is the local page</div>,
        },
      ])}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
