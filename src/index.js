import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./routes/ErrorPage";
import Main from "./routes/Main";
import Join from "./routes/Join";
import Host from "./routes/Host";
import Local from "./routes/Local";
import Demo from "./routes/Demo";

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
            { path: "/", element: <Main /> },
            {
              path: "/join",
              element: <Join />,
            },
            {
              path: "/host",
              element: <Host />,
            },
            {
              path: "/local",
              element: <Local />,
            },
            {
              path: "/demo",
              element: <Demo />,
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
