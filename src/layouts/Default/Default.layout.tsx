import "./Default.css";

import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout: React.FC = (): JSX.Element => {
  return (
    <div style={{ backgroundColor: "yellow" }}>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
