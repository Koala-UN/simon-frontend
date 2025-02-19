import { createContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "../types/interfaces";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const defaultUser: User = { id: 0, correo: "" };
  const authStatus = localStorage.getItem("isAuthenticated");
  const userStatus = localStorage.getItem("user");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authStatus === "true");
  const [user, setUser] = useState<User>(userStatus ? JSON.parse(userStatus) : defaultUser);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/restaurant/auth-status", {
          method: "GET",
          credentials: "include", // Para enviar cookies
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
          setUser(data.user); // Asumiendo que la respuesta incluye los datos del usuario
          // guardar en storage estos datos

          localStorage.setItem("isAuthenticated", data.authenticated);
          localStorage.setItem("user", JSON.stringify(data.user));

          console.log("Estado de autenticación verificado:", data);
        } else {
          setIsAuthenticated(false);
          setUser(defaultUser);

        }
      } catch (error) {
        console.error("Error al verificar el estado de autenticación:", error);
        setIsAuthenticated(false);
        setUser(defaultUser);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider ;
export { AuthContext };