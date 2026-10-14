import { createRoot } from "react-dom/client";
import "./style.scss";
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/Auth/AuthContext";
import { PostContextProvider } from "./features/posts/PostContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PostContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </PostContextProvider>
  </AuthProvider>,
);
