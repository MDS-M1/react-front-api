import "./Header.scss";

import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../../../services/Auth.service";

const Header: React.FC = () => {
  const userData = localStorage.getItem("access_token");

  if (userData) {
    const user = getCurrentUser();
    return (
      <header>
        <h1>PostManager</h1>
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
              {user && (
                <li className="logout" onClick={logout}>
                  Logout
                </li>
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
  } else {
    return (
      <header>
        <h1>PostManager</h1>
        <div className="header--nav">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
};
export default Header;
