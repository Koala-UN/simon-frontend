import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./getContext.ts";

const PrivateRoute = () => {
  const {isAuthenticated} = useAuth();
  console.log("private route", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;