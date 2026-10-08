import { Link } from "react-router-dom";
import "../style/form.scss"
import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {

  const [userName, setuserName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  function handleRegisterSubmit(e) {
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/register", {
      userName,
      email,
      password},{
        withCredentials: true
      })
    .then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit}>
          <input type="text"
           placeholder="Enter Username"
           onInput={(e)=>{setuserName(e.target.value)}}/>
          <input type="text" placeholder="Enter email"
          onInput={(e)=>{setemail(e.target.value)}}/>
          <input type="text"
           placeholder="Enter password"
           onInput={(e)=>{setpassword(e.target.value)}}/>
          <button>Register</button>
        </form>

        <p>Already have an account <Link className="toggel-auth-form" to="/login" >Login</Link></p>
      </div>
    </main>
  )
}

export default RegisterForm
