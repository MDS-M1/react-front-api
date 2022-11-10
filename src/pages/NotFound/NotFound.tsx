import "./NotFound.css";

import React from "react";
import { withRouter } from "../../utils/withRouter";

function NotFound() {
  return <p>Page not found.</p>;
}

export default withRouter(NotFound);
