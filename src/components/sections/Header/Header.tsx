import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./Header.css";

const Header: React.FC = (): JSX.Element => {
  return (
    <footer>
      <h1>PostManager</h1>
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
    </footer>
  );
};

export default Header;
