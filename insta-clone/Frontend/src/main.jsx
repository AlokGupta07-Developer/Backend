import { createRoot } from "react-dom/client";
import "./style.scss";
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/Auth/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </AuthProvider>,
);
