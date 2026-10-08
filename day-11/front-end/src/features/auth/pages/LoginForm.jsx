import { Link } from "react-router-dom";
import "../style/form.scss";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {

    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")
  

  function handleLoginSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/login",{
        userName,
        password
    },{
        withCredentials: true
    })

    .then((res)=>{
        console.log(res.data)
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <input 
          type="text" 
          placeholder="Enter Username" 
          onInput={(e)=>{setuserName(e.target.value)}}/>
          <input type="text"
           placeholder="Enter Password" 
           onInput={(e)=>{setpassword(e.target.value)}}/>
          <button>Login</button>
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
