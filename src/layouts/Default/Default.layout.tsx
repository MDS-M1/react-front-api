import "./Default.scss";

import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout: React.FC = (): JSX.Element => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default DefaultLayout;
