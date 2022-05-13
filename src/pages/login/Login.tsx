import { FormEvent, ReactEventHandler, useState } from "react";

//styles
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>
      <button className="button" type="submit">
        Sign In
      </button>
    </form>
  );
}
