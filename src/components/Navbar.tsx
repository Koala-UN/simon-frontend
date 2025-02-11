import { useState, useEffect } from "react";
import { Button, Typography, IconButton, Menu, MenuItem } from "@material-tailwind/react";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import logo from"../assets/logosimon.png";
import { useNavigate } from "react-router-dom";
import {User} from "../types/interfaces.ts";
interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "/products", label: "Productos" },
  { href: "/terms-and-conditions", label: "Términos y condiciones" },
  { href: "/about-us", label: "Quiénes somos" },
  { href: "/help", label: "Ayuda" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  // Check user authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/restaurant/auth-status", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setAuthenticated(data.authenticated);
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(import.meta.env.VITE_BACKEND_URL+"/api/restaurant/logout", {
        method: "POST",
        credentials: "include",
      });
      setAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left - Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate("/")}>
          <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
        </div>

        {/* Center - Navigation Links */}
        <nav className="hidden md:flex gap-8">
          {routeList.map((route, index) => (
            <Typography
              key={index}
              variant="small"
              className="hover:text-blue-500 transition text-gray-700 cursor-pointer"
              onClick={() => handleNavigate(route.href)}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {route.label}
            </Typography>
          ))}
        </nav>

        {/* Right - Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {authenticated ? (
            <div className="relative">
              <IconButton
                variant="text"
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                <UserCircleIcon className="w-8 h-8 text-gray-700" />
              </IconButton>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <div className="p-4 border-b">
                    <Typography variant="small" className="text-gray-700"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      Hola, {user?.correo || "Usuario"}
                    </Typography>
                  </div>
                  <Menu>
                    <MenuItem
                      onClick={() => handleNavigate("/admin/reserve")}
                      className="text-gray-700 hover:bg-gray-100"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      Ver Perfil
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigate("/change-password")}
                      className="text-gray-700 hover:bg-gray-100"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      Cambiar Contraseña
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      className="text-gray-700 hover:bg-gray-100"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button
                  variant="outlined"
                  size="sm"
                  className="border-gray-500 text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigate("/login")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Iniciar sesión
              </Button>
              <Button
                  variant="filled"
                  size="sm"
                  className="bg-gray-800 text-white hover:bg-gray-700"
                  onClick={() => handleNavigate("/register")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Registrarse
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <IconButton
          variant="text"
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </IconButton>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col items-center gap-4 py-4">
            {routeList.map((route, index) => (
              <Typography
                key={index}
                variant="small"
                className="hover:text-blue-500 transition text-gray-700 cursor-pointer"
                onClick={() => handleNavigate(route.href)}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {route.label}
              </Typography>
            ))}
            {!authenticated ? (
              <>
                <Button
                  variant="outlined"
                  size="sm"
                  className="border-gray-500 text-gray-700 w-full"
                  onClick={() => handleNavigate("/login")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Iniciar sesión
                </Button>
                <Button
                  variant="filled"
                  size="sm"
                  className="bg-gray-800 text-white w-full"
                  onClick={() => handleNavigate("/register")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Registrarse
                </Button>
              </>
            ) : (
              <>
                <MenuItem
                    onClick={() => handleNavigate("/admin/reserve")}
                    className="text-gray-700 hover:bg-gray-100 w-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Ver Perfil
                </MenuItem>
                <MenuItem
                    onClick={() => handleNavigate("/change-password")}
                    className="text-gray-700 hover:bg-gray-100 w-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Cambiar Contraseña
                </MenuItem>
                <MenuItem
                    onClick={handleLogout}
                    className="text-gray-700 hover:bg-gray-100 w-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Cerrar Sesión
                </MenuItem>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
