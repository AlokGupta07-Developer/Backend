import { Routes, Route } from "react-router-dom";
import Register from "./features/Auth/Pages/Register";
import Login from "./features/Auth/Pages/Login";


const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<main><h1>This is insta feed page</h1></main>} />
      </Routes>
    </div>
  )
}

export default AppRouter
