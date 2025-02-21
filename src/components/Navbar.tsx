import { useState, useEffect } from "react";
import { Button, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logosimon.png";
import { useAuth } from "../utils/getContext.ts";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "/terms-and-conditions", label: "Términos y condiciones" },
  { href: "/about-us", label: "Quiénes somos" },
  { href: "/help", label: "Ayuda" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isAuthenticated, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Manejo del menú móvil
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el evento de cierre del useEffect lo bloquee
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Cierra el menú si el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".menu-container") && !target.closest(".menu-toggle")) {
        setIsMenuOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    closeMenu();
    window.location.href = path;
  };

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
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* 🔹 Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
          <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
        </div>

        {/* 🔹 Enlaces de Navegación (Solo en Desktop) */}
        <nav className="hidden md:flex gap-8">
          {routeList.map((route, index) => (
            <Typography
              key={index}
              variant="small"
              className="hover:text-blue-500 transition text-gray-700 cursor-pointer"
              onClick={() => handleNavigate(route.href)}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}            >
              {route.label}
            </Typography>
          ))}
        </nav>

        {/* 🔹 Botones de Usuario (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative menu-container">
              <div onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
                {user?.imageUrl ? (
                  <img src={user.imageUrl} alt="User" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <UserCircleIcon className="w-8 h-8 text-gray-700" />
                )}
              </div>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg">
                  <div className="p-4 border-b">
                    <Typography variant="small" className="text-gray-700"   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>
                      Hola, {user?.nombre || "Usuario"}
                    </Typography>
                  </div>
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigate("/admin/reserve")}>Ver Perfil</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigate("/change-password")}>Cambiar Contraseña</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigate("/recover-password")}>Recuperar Contraseña</li>
                    
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Cerrar Sesión</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="outlined" size="sm" className="border-gray-500 text-gray-700" onClick={() => handleNavigate("/login")}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>
                Iniciar sesión
              </Button>
              <Button variant="filled" size="sm" className="bg-gray-800 text-white" onClick={() => handleNavigate("/register")}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>
                Registrarse
              </Button>
            </>
          )}
        </div>

        {/* 🔹 Botón Menú Mobile */}
        <IconButton variant="text" size="sm" className="md:hidden menu-container menu-toggle" onClick={toggleMenu}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>
          {isMenuOpen ? <XMarkIcon className="w-6 h-6 text-gray-700" /> : <Bars3Icon className="w-6 h-6 text-gray-700" />}
        </IconButton>
      </div>

      {/* 🔹 Menú Mobile */}
      <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={closeMenu}></div>
      
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menú</h2>
          <IconButton variant="text" size="sm" className="menu-toggle" onClick={closeMenu}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          </IconButton>
        </div>
        <nav className="flex flex-col gap-4 p-4">
          {routeList.map((route, index) => (
            <Typography
              key={index}
              variant="small"
              className="hover:text-blue-500 transition text-gray-700 cursor-pointer"
              onClick={() => handleNavigate(route.href)}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}            >
              {route.label}
            </Typography>
          ))}
          {!isAuthenticated ? (
            <>
              <Button variant="outlined" size="sm" className="border-gray-500 text-gray-700 w-full" onClick={() => handleNavigate("/login")}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>
                Iniciar sesión
              </Button>
              <Button variant="filled" size="sm" className="bg-gray-800 text-white w-full" onClick={() => handleNavigate("/register")}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>
                Registrarse
              </Button>
            </>
          ) : (
            <>
              <Typography className="hover:bg-gray-100 p-2 cursor-pointer" onClick={() => handleNavigate("/admin/reserve")}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>Ver Perfil</Typography>
              <Typography className="hover:bg-gray-100 p-2 cursor-pointer" onClick={() => handleNavigate("/change-password")}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>Cambiar Contraseña</Typography>
              <Typography className="hover:bg-gray-100 p-2 cursor-pointer" onClick={handleLogout}   placeholder= {undefined} onPointerEnterCapture= {()=> {}} onPointerLeaveCapture= {()=> {}}>Cerrar Sesión</Typography>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
