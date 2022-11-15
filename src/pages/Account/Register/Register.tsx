import "./Register.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

import { useStores } from "../../../hooks/useStores";
import { withRouter } from "../../../utils/withRouter";

const Register = () => {
  const navigate = useNavigate();
  const { authStore } = useStores();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerPayload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      passwordConfirmation: formData.get("repeat-password") as string,
    };

    authStore.register(registerPayload).then(() => navigate("/"));
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
