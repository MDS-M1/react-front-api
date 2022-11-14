import "./global.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";

import { AuthProvider } from "./providers/Auth.provider";

import Header from "./components/sections/Header/Header";
import Footer from "./components/sections/Footer/Footer";

import DefaultLayout from "./layouts/Default/Default.layout";

import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Account/Register/Register";
import Login from "./pages/Account/Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" replace /> },
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "404", element: <NotFound /> },
    ],
  };

  const routing = useRoutes([mainRoutes]);

  return <>{routing}</>;
};

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Header />
        <App />
        <Footer />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
