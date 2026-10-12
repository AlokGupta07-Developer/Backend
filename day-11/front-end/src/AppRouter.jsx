import { Route, Routes } from "react-router-dom";
import RegisterForm from "./features/auth/pages/RegisterForm";
import LoginForm from "./features/auth/pages/LoginForm";
import Feed from "./features/posts/pages/Feed";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={ <RegisterForm /> } />
      <Route path="/login" element={ <LoginForm /> } />
      <Route path="/" element={ <Feed /> } />
    </Routes>
  );
}
