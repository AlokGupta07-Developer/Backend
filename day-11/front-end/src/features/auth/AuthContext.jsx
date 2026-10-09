import { createContext, useState } from "react";
import { register, login } from "./services/auth.api";

// The context and provider are kept together in this file.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (userName, email, password) => {
    setLoading(true);
    try {
      const response = await register(userName, email, password);
      console.log("REGISTER RESPONSE:", response);
      setUser(response.user);
      return response;
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (userName, password) => {
    setLoading(true);

    try {
      const response = await login(userName, password);
      console.log("LOGIN RESPONSE:", response);
      setUser(response.user);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleRegister, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
