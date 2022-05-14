import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

//styles
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logoutUser } = useLogout();
  return (
    <nav className="navbar">
      <ul>
        <li className="title">myMoney</li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button className="button" onClick={logoutUser}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
