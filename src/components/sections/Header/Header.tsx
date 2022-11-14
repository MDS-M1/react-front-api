import "./Header.scss";

import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import { useAuthStore } from "../../../providers/Auth.provider";

const Header: React.FC = observer(() => {
  const { user, logout } = useAuthStore();

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
});
export default Header;
