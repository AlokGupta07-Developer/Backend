import { Route, Routes } from "react-router-dom";
import RegisterForm from "./features/auth/pages/RegisterForm";
import LoginForm from "./features/auth/pages/LoginForm";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}
