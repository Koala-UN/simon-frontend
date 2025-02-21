import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./getContext.ts";

const PrivateRoute = () => {
  // useAuth es una funcion que hace useContext() y trae ese contexto
  const {isAuthenticated} = useAuth();
  console.log("private route", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;