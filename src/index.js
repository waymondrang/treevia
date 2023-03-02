import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./routes/ErrorPage";
import Main from "./routes/Main";
import Host from "./routes/Host";
import Local from "./routes/MainPage";
import Demo from "./routes/Demo";
import Play from "./routes/Play";
import Trivia from "./routes/TriviaTestPage";
import io from "socket.io-client";

const _io = io();
_io.disconnect();

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
              path: "/play",
              element: <Play _io={_io} />,
            },
            {
              path: "/host",
              element: <Host _io={_io} />,
            },
            {
              path: "/local",
              element: <Local />,
            },
            {
              path: "/demo",
              element: <Demo />,
            },
            {
              path: "/trivia",
              element: <Trivia/>,
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
