import { useState } from "react";
import "./styles/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate()

  async function handleRegisterSubmit(e) {
    e.preventDefault();

    try {
      await handleRegister(userName, email, password);
      setuserName("");
      setemail("");
      setpassword("");
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          <form autoComplete="off" onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              placeholder="Enter userName"
              required
              autoComplete="off"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <button type="submit" disabled={loading}>{loading ? "loading..." : "Register"}</button>
          </form>

          <p>
            Already have an account?
            <Link to={"/login"} className="toggle-auth-form">
              {" "} 
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
