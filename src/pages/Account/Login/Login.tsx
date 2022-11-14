import "./Login.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

import { withRouter } from "../../../utils/withRouter";
import { useAuthStore } from "../../../providers/Auth.provider";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerPayload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    login(registerPayload).then(() => navigate("/"));
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
