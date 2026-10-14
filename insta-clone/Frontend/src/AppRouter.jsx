import { Routes, Route } from "react-router-dom";
import Register from "./features/Auth/Pages/Register";
import Login from "./features/Auth/Pages/Login";
import Feed from "./features/posts/pages/Feed";
import CreatePost from "./features/posts/pages/CreatePost";



const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />}/>
      </Routes>
    </div>
  )
}

export default AppRouter
