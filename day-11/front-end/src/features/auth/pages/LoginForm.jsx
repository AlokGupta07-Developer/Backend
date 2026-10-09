import { Link } from "react-router-dom";
import "../style/form.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const { loading, handleLogin } = useAuth();

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      await handleLogin(userName, password);
    } catch (error) {
      console.error(error);
    }

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          userName,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit} 
        autoComplete="off">
          <input
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            autoComplete="new-password"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p>
          Dont have an account{" "}
          <Link className="toggel-auth-form" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginForm;
