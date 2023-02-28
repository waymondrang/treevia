import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./routes/ErrorPage";
import JoinPage from "./routes/JoinPage";
import HostPage from "./routes/HostPage";
import LocalPage from "./routes/LocalPage";
import TriviaTestPage from "./routes/TriviaTestPage";
import MainPage from "./routes/MainPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <App />,
          errorElement: <ErrorPage />,
          children: [
            { path: "/", element: <MainPage /> },
            {
              path: "/join",
              element: <JoinPage />,
            },
            {
              path: "/host",
              element: <HostPage />,
            },
            {
              path: "/local",
              element: <LocalPage />,
            },
            {
              path: "/test",
              element: <TriviaTestPage />,
            },
          ],
        },
      ])}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
