import "./SinglePostPage.scss";

import React from "react";
import { withRouter } from "../../../utils/withRouter";

function SinglePostPage() {
  return (
    <>
      <h2>Hello world!</h2>
      <p>This article isn't read yet!</p>
    </>
  );
}

export default withRouter(SinglePostPage);
