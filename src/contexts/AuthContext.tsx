import { createContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "../types/interfaces";
import Loading from "../components/Loading"
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading ] = useState<boolean>(false);
  const defaultUser: User = { id: 0, correo: "" };
  const authStatus = localStorage.getItem("isAuthenticated");
  const userStatus = localStorage.getItem("user")== "undefined" ? null : localStorage.getItem("user");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authStatus === "true" ? true : false);
  const [user, setUser] = useState<User>( userStatus ? JSON.parse(userStatus ) : defaultUser);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/restaurant/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          contrasena: password,
        }),
        credentials: "include",
      });

      const resp = await response.json();

      if (response.ok) {
        const { data } = resp;
        setIsAuthenticated(true);
        setUser(data.user);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: resp.message || "Login failed" };
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(defaultUser);
      return { success: false, message: (error as Error).message || "Login failed"};
    }
  };

  const logout = async () => {
    if (!isAuthenticated) return Promise.resolve(new Response("", { status: 401 }));
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/restaurant/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUser(defaultUser);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        console.log("Logout successful");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      return response;
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  const register = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/restaurant/register", {
        method: "POST",
        credentials: "include",
        body: formData,
      }, );

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUser(data.user);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Registration successful:", data);
        return { success: true, message: "Registration successful" };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setIsAuthenticated(false);
      setUser(defaultUser);
      return { success: false, message: (error as Error).message || "Registration failed" };
    }
  };

  // funcion para hacer post a : /api/restaurant/auth-status e enviar en el body un user{}:

  const postAuthStatus = async (user: User) => {
    try {
        console.log("user postAuthStatus:-- ", user)
    }
    catch (error) {
      console.error("Error al verificar el estado de autenticación:", error);
    }
  }



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
          // const imageUrl = data.user.imageUrl;
          // si la imagen no es null y tiene "googleusercontent.com" entonces es una foto de google y hay que hacerle fetch y hacer URL object
          // if (imageUrl && imageUrl.includes("googleusercontent.com")) {
            
          // }
          setUser(data.user); // Asumiendo que la respuesta incluye los datos del usuario
          // guardar en storage estos datos

          localStorage.setItem("isAuthenticated", data.authenticated);
          localStorage.setItem("user", JSON.stringify(data.user));

          console.log("Estado de autenticación verificado:", data);
        } else {
          setIsAuthenticated(false);
          //setUser(defaultUser);
          console.log("No hay una sesión activa: ", response);
     }
      } catch (error) {
        console.error("Error al verificar el estado de autenticación:", error);
        setIsAuthenticated(false);
        //setUser(defaultUser);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser , login, logout, register, setIsLoading, postAuthStatus, isAdminMenuOpen, setIsAdminMenuOpen }}>
     <Loading isLoading={isLoading}>

      {children}
     </Loading>
    </AuthContext.Provider>
  );
};

export default AuthProvider ;
export { AuthContext };