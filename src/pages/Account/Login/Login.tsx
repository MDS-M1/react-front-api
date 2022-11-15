import "./Login.scss";

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { withRouter } from "../../../utils/withRouter";
import { useStores } from "../../../hooks/useStores";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authStore } = useStores();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerPayload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    authStore.login(registerPayload).then(() => {
      const searchParams = new URLSearchParams(location.search);
      const haveRedirect = searchParams.get("redirect");
      navigate(haveRedirect || "/");
    });
  };

  return (
    <>
      <h2>Connect to your account</h2>
      <p>View all posts with your personnal account</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="label--email">Email:</label>
          <input name="email" type="email" id="label--email" required />
        </div>
        <div>
          <label htmlFor="label--password">Password:</label>
          <input
            name="password"
            type="password"
            id="label--password"
            required
          />
        </div>
        <input type="submit" className="btn btn--primary" value="Submit" />
      </form>
    </>
  );
};

export default withRouter(Login);
