import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Landing from "./pages/landing/Landing";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar />
          <Routes>
            <Route path="/home" element={user ? <Home /> : <Landing />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/home" /> : <Register />}
            />
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <Landing />}
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
