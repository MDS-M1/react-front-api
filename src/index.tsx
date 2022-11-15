import "./global.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";

import Header from "./components/sections/Header/Header";
import Footer from "./components/sections/Footer/Footer";

import DefaultLayout from "./layouts/Default/Default.layout";

import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Account/Register/Register";
import Login from "./pages/Account/Login/Login";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import CreatePost from "./pages/Admin/Posts/CreatePost/CreatePost";
import EditPost from "./pages/Admin/Posts/EditPost/EditPost";
import AdminPostsList from "./pages/Admin/Posts/PostsList/AdminPostsList";
import SingleUserPage from "./pages/Admin/Users/SingleUserPage/SingleUserPage";
import EditUser from "./pages/Admin/Users/EditUser/EditUser";
import UsersList from "./pages/Admin/Users/UsersList/UsersList";
import PostsList from "./pages/Posts/PostsList/PostsList";
import SinglePostPage from "./pages/Posts/ViewPost/SinglePostPage";
import { ProtectedRoute } from "./providers/ProtectedRoute.provider";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

const App: React.FC = (): JSX.Element => {
  const mainRoutes = [
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
      ],
    },
    {
      path: "/posts",
      element: (
        <ProtectedRoute>
          <DefaultLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <PostsList /> },
        {
          path: ":postId",
          element: <SinglePostPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute requestedRole="admin">
          <DefaultLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Dashboard /> },
        {
          path: "posts",
          element: <AdminPostsList />,
        },
        {
          path: "post/create",
          element: <CreatePost />,
        },
        {
          path: "post/:postId/edit",
          element: <EditPost />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path: "user/:userId",
          element: <SingleUserPage />,
        },
        {
          path: "user/:userId/edit",
          element: <EditUser />,
        },
      ],
    },
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ];

  const routing = useRoutes(mainRoutes);

  return <>{routing}</>;
};

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <App />
      <Footer />
    </Router>
  </React.StrictMode>
);
