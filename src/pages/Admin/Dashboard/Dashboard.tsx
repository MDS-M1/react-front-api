import "./Dashboard.scss";

import React from "react";
import { withRouter } from "../../../utils/withRouter";

function Dashboard() {
  return (
    <>
      <h2>Dashboard</h2>
      <p>Welcome in your dashboard!</p>
    </>
  );
}

export default withRouter(Dashboard);
