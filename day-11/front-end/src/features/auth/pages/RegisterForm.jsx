import { Link } from "react-router-dom";
import "../style/form.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const RegisterForm = () => {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { loading, handleRegister } = useAuth();

  async function handleRegisterSubmit(e) {
    e.preventDefault();

    try {
      await handleRegister(userName, email, password);
      setuserName("");
      setemail("");
      setpassword("");
    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    }
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleRegisterSubmit}
        autoComplete="off">
          <input
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            required
            autoComplete="off"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            autoComplete="off"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="toggel-auth-form" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterForm;