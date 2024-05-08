import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/detail/:id",
    element: <Detail/>
  }
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Navbar />
      <div className="flex justify-center bg-slate-50 min-h-screen pt-20">
        <div className="px-5 w-full max-w-5xl">
          <RouterProvider router={router} />
        </div>
      </div>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found in the document.');
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals(console.log);
