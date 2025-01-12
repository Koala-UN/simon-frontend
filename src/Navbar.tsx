import { useState } from "react";
import { Button, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import logo from "./assets/logosimon.png";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "#productos", label: "Productos" },
  { href: "#terminos", label: "Términos y condiciones" },
  { href: "#nosotros", label: "Quiénes somos" },
  { href: "#ayuda", label: "Ayuda" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="" />
        </div>

        {/* Center - Navigation Links */}
        <nav className="hidden md:flex gap-8">
          {routeList.map((route, index) => (
            <Typography
              as="a"
              href={route.href}
              key={index}
              variant="small"
              className="hover:text-blue-500 transition text-gray-700"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {route.label}
            </Typography>
          ))}
        </nav>

        {/* Right - Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outlined"
            size="sm"
            className="border-gray-500 text-gray-700 hover:bg-gray-100"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Iniciar sesión
          </Button>
          <Button
            variant="filled"
            size="sm"
            className="bg-gray-800 text-white hover:bg-gray-700"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Registrarse
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <IconButton
          variant="text"
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </IconButton>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col items-center gap-4 py-4">
            {routeList.map((route, index) => (
              <Typography
                as="a"
                href={route.href}
                key={index}
                variant="small"
                className="hover:text-blue-500 transition text-gray-700"
                onClick={() => setIsOpen(false)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {route.label}
              </Typography>
            ))}
            <Button
              variant="outlined"
              size="sm"
              className="border-gray-500 text-gray-700 w-full"
              onClick={() => setIsOpen(false)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Iniciar sesión
            </Button>
            <Button
              variant="filled"
              size="sm"
              className="bg-gray-800 text-white w-full"
              onClick={() => setIsOpen(false)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Registrarse
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
