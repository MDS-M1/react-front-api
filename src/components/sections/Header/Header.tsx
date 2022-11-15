import "./Header.scss";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

import { useStores } from "../../../hooks/useStores";

const Header: React.FC = observer(() => {
  const { authStore } = useStores();
  const { user, logout } = authStore;
  const navigate = useNavigate();

  const disconnectUser = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <h1>
        <Link to="/">PostManager</Link>
      </h1>
      <div className="header--nav">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {user && user.role === "admin" && (
              <li>
                <Link to="/admin/post/create">Create a post</Link>
              </li>
            )}
            {user && (
              <>
                <li>
                  <Link to="/posts">Posts</Link>
                </li>
                <li className="logout" onClick={disconnectUser}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
        {user && (
          <div className="header--nav-user">
            <p>{user.name}</p>
          </div>
        )}
      </div>
    </header>
  );
});
export default Header;
