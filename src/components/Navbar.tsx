import { useState, useEffect } from "react";
import { Button, Typography, IconButton, Menu, MenuItem } from "@material-tailwind/react";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logosimon.png";
////import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/getContext.ts";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    //navigate(path);
    window.location.href = path;
  };

  // agregar un listener de mouseclick para cerrar el menu

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".relative")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Check user authentication status
  useEffect(() => {


  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/restaurant/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3"
        onClick={() => setIsOpen(false)}
      >
        {/* Left - Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
          <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
        </div>

        {/* Center - Navigation Links */}
        <nav className="hidden md:flex gap-8">
          {routeList.map((route, index) => (
            <Typography
              key={index}
              variant="small"
              className="hover:text-blue-500 transition text-gray-700 cursor-pointer"
              onClick={() => handleNavigate(route.href)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {route.label}
            </Typography>
          ))}
        </nav>

        {/* Right - Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none hover:bg-gray-100 h-8 rounded-full cursor-pointer"
              >

                {user?.imageUrl ? (
                  <img src={user.imageUrl} alt="User" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <UserCircleIcon className="w-8 h-8 text-gray-700" />
                )}

              </div>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <div className="p-4 border-b">
                    <Typography variant="small" className="text-gray-700" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      Hola, {user?.nombre || "Usuario"}
                    </Typography>
                  </div>
                  <Menu>
                    <MenuItem
                      onClick={() => handleNavigate("/admin/reserve")}
                      className="text-gray-700 hover:bg-gray-100" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      Ver Perfil
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigate("/change-password")}
                      className="text-gray-700 hover:bg-gray-100" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      Cambiar Contraseña
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigate("/recover-password")}
                      className="text-gray-700 hover:bg-gray-100" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      Recuperar Contraseña
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      className="text-gray-700 hover:bg-gray-100" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
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
                onClick={() => handleNavigate("/login")} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Iniciar sesión
              </Button>
              <Button
                variant="filled"
                size="sm"
                className="bg-gray-800 text-white hover:bg-gray-700"
                onClick={() => handleNavigate("/register")} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
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
          onClick={() => setIsOpen(!isOpen)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
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
                onClick={() => handleNavigate(route.href)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {route.label}
              </Typography>
            ))}
            {!isAuthenticated ? (
              <>
                <Button
                  variant="outlined"
                  size="sm"
                  className="border-gray-500 text-gray-700 w-full"
                  onClick={() => handleNavigate("/login")} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Iniciar sesión
                </Button>
                <Button
                  variant="filled"
                  size="sm"
                  className="bg-gray-800 text-white w-full"
                  onClick={() => handleNavigate("/register")} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Registrarse
                </Button>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => handleNavigate("/admin/reserve")}
                  className="text-gray-700 hover:bg-gray-100 w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Ver Perfil
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigate("/change-password")}
                  className="text-gray-700 hover:bg-gray-100 w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Cambiar Contraseña
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  className="text-gray-700 hover:bg-gray-100 w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
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
