import { createRoot } from "react-dom/client";
import "./style.scss";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter.jsx";
import { AuthProvider } from "./features/auth/AuthContext.jsx";
import { PostContextProvider } from "./features/posts/post.context.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PostContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </PostContextProvider>
  </AuthProvider>,
);
