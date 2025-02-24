import { Typography, Button } from "@material-tailwind/react";
//////import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/getContext";
import { useEffect, useState } from "react";

import { FullRestaurant } from "../types/interfaces";
function Sidebar() {
  const { isAuthenticated, logout, user, isAdminMenuOpen} = useAuth();
  const [restaurant, setRestaurant] = useState<FullRestaurant | null>(null);
  //// const navigate = useNavigate();
  const handleLogout = async () => {
    if (!isAuthenticated) window.location.href = "/login";
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  useEffect(() => {
    // buscar el restaurante por el user.id, y mostrar los datos en consola con la interfaz FullRestaurant
    const fetchProfile = async () => {
      if (!isAuthenticated || !user.id) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${user.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await response.json();

        if (response.ok) {
          console.log("🚀 ~ file: Sidebar.tsx ~ line 73 ~ fetchProfile ~ data", data)
          setRestaurant(data.data);
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }
  , [isAuthenticated, user.id]);



  return (
    // Aquí se muestra el panel de administración solo si isAdminMenuOpen es true
    
    <div className={`sm:w-1/3 lg:w-1/3 bg-blue-800 text-white p-4 h-screen ${isAdminMenuOpen ? '' : 'hidden lg:block'}`}>
      <Typography variant="h5" className="font-bold mb-6 text-center"   placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
      <>
        Panel de administración
        <br />
        {user.nombre}
      </>
      </Typography>
      <nav className="space-y-4">
        <div>
          <Typography variant="small" className="uppercase text-blue-300"   placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
            Servicios
          </Typography>
          <ul className="space-y-2 mt-2">
            <li onClick={() => window.location.href = "/admin/edit-profile"} className="cursor-pointer hover:text-blue-300">
              Perfil
            </li>
            <li onClick={() => window.location.href = "/admin/reserve"} className="cursor-pointer hover:text-blue-300">
              Reservaciones
            </li>
            <li onClick={() => window.location.href = "/admin/orders"} className="cursor-pointer hover:text-blue-300">
              Pedidos
            </li>
            <li onClick={() => window.location.href = "/admin/inventory"} className="cursor-pointer hover:text-blue-300">
              Inventario
            </li>
          </ul>
        </div>
        <Button size="sm" color="red" className="w-full mt-6"   placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}
          onClick={handleLogout}
          >
          Cerrar sesión
        </Button>
        {!restaurant?.suscripcion?.id && ( 
          <><Typography variant="small" className="text-white mt-4 bg-gray-900 p-2 rounded-lg border border-red-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <span className="font-bold ">¡Atención!</span> Debes pagar para obtener todos los beneficios porque no hay suscripción.
            <Button size="sm" color="green" className="w-full mt-6 mb-2"   placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}
          onClick={() => window.location.href = "/plans"}
          >
          Pagar suscripción
        </Button>
          </Typography>
          </>

        )}
        {(restaurant?.estado === "NO_VERIFICADO") && (
          <div className="mt-4 p-4 bg-teal-600 rounded-lg border border-red-500 text-white">
            <Typography variant="small" className="font-bold"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Debes verificar tu correo para obtener todos los beneficios.
            </Typography>
            <Typography variant="small" className="mt-2"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Si no obtuviste el correo de verificación, haz clic en el botón de abajo para reenviarlo.
            </Typography>
            <Button
              size="sm"
              color="blue"
              className="w-full mt-4"
              onClick={() => window.location.href = "/restaurant/verify-email-send"}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Reenviar correo de verificación
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
