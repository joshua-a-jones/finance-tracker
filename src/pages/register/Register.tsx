import { FormEvent, useState } from "react";
import { useRegistration } from "../../hooks/useRegistration";

// styles
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { error, isPending, registerUser } = useRegistration();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmationPassword && isEmailValid && isPasswordValid) {
      registerUser(email, password, displayName);
    }
  };

  const handlEmailInputChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setIsEmailValid(!e.currentTarget.validity.typeMismatch);
  };

  const handlPasswordInputChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    setIsPasswordValid(!e.currentTarget.validity.patternMismatch);
  };

  return (
    <form className="registration-form" onSubmit={handleFormSubmit}>
      <h2>Register</h2>
      <label>
        <span>Username:</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        ></input>
      </label>
      <label>
        <span>Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => handlEmailInputChange(e)}
          required
        ></input>
      </label>
      <fieldset>
        <legend>Choose a password</legend>
        <label>
          <span>Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => handlPasswordInputChange(e)}
            required
          ></input>
        </label>
        <label>
          <span>Confirm password:</span>
          <input
            type="password"
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
            required
          ></input>
        </label>
      </fieldset>
      <button className="button" type="submit" disabled={isPending}>
        Submit
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
