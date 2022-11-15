import "./Home.scss";

import React from "react";
import { withRouter } from "../../utils/withRouter";

function Home() {
  return (
    <>
      <h2>Last posts</h2>
      <section>
        <article>
          <h4>Article 1</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            voluptatum temporibus veniam? Iure illo blanditiis ipsam beatae,
            tempore expedita eaque eius obcaecati adipisci in autem culpa neque
            soluta esse facere?
          </p>
        </article>
      </section>
    </>
  );
}

export default withRouter(Home);
