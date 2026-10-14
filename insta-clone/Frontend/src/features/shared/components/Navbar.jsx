import "../Nav.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()
  return (
    <nav className="nav-bar">
        <p>Insta</p>
        <button 
        className="button primary-button"
        onClick={()=>{navigate("/create-post")}}>Create post</button>


      
    </nav>
  )
}

export default Navbar
