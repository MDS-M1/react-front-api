import "./Register.css";

import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../providers/Auth.provider";
import { withRouter } from "../../../utils/withRouter";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerPayload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      passwordConfirmation: formData.get("repeat-password"),
    };

    register(registerPayload).then(() => navigate("/"));
  };

  return (
    <>
      <h2>Create account</h2>
      <p>View all posts with your personnal account</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="label--name">Name:</label>
          <input name="name" type="text" id="label--name" required />
        </div>
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
          <label htmlFor="label--repeat-password">Repeat password:</label>
          <input
            name="repeat-password"
            type="password"
            id="label--repeat-password"
            required
          />
        </div>
        <input type="submit" className="btn btn--primary" value="Submit" />
      </form>
    </>
  );
};

export default withRouter(Register);
