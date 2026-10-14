import { useState } from "react";
import "./styles/form.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate()

  const { loading, handleLogin } = useAuth();


  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      await handleLogin(userName, password);
      setuserName("");
      setpassword("");
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form autoComplete="off" onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            autoComplete="off"
            value={userName}
            onChange={(e) => {
              setuserName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter password"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          <button type="submit" disabled={loading}>
            {loading ? "loading..." : "Login"}
          </button>
        </form>

        <p>
          Dont have an account
          <Link to={"/register"} className="toggle-auth-form">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
