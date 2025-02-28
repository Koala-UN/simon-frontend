import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/getContext";
interface Order {
  id: number;
  fecha: string;
  hora: string;
  estado: string;
  total: number;
}

function AdminDashboardOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { isAuthenticated, user, logout } = useAuth();
  const ordersPerPage = 5;
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Check authentication status and fetch orders
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        
        if (!isAuthenticated) {
          window.location.href = "/login";
          return;
        } else {
            const restauranteId = user.id;

            // Fetch orders if authenticated
            const ordersResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/order?restaurantId=${restauranteId}`,
              {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              }
            );

            const ordersData = await ordersResponse.json();

            if (ordersResponse.ok && Array.isArray(ordersData)) {
              setOrders(ordersData);
              setTotalPages(Math.ceil(ordersData.length / ordersPerPage));
            } else {
              console.error("Error al obtener pedidos:", ordersData);
              setOrders([]);
            }

          }
        
        
      } catch (error) {
        console.error("Error checking auth status:", error);
        window.location.href = "/login";
      }
    };

    checkAuthStatus();
  }, [isAuthenticated, navigate, user.id]);

  // Paginate orders
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h6"  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>Verificando autenticación...</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-blue-800 text-white p-4">
        <Typography variant="h5" className="font-bold mb-6 text-center"  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
          Admin Dashboard
        </Typography>
        <nav className="space-y-4">
          <div>
            <Typography variant="small" className="uppercase text-blue-300"  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
              Servicios
            </Typography>
            <ul className="space-y-2 mt-2">
              <li
                onClick={() => window.location.href = "/admin/reserve"}
                className="cursor-pointer hover:text-blue-300"
              >
                Reservas
              </li>
              <li
                onClick={() => window.location.href = "/admin/orders"}
                className="cursor-pointer hover:text-blue-300"
              >
                Pedidos
              </li>
              <li
                onClick={() => window.location.href = "/inventory"}
                className="cursor-pointer hover:text-blue-300"
              >
                Inventario
              </li>
            </ul>
          </div>
          <Button
            size="sm"
            color="red"
            className="w-full mt-6"
            onClick={handleLogout}  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}          >
            Cerrar sesión
          </Button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-full lg:w-3/4 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Typography variant="h5" className="font-bold mb-4"  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
            Pedidos
          </Typography>
          <Typography variant="small" className="text-blue-600 mb-6 block"  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
            Últimos pedidos
          </Typography>

          {/* Table */}
          <div className="overflow-auto">
            <table className="table-auto w-full border-collapse border border-blue-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-blue-300 px-4 py-2 text-left">
                    Fecha
                  </th>
                  <th className="border border-blue-300 px-4 py-2 text-left">
                    Hora
                  </th>
                  <th className="border border-blue-300 px-4 py-2 text-left">
                    Estado
                  </th>
                  <th className="border border-blue-300 px-4 py-2 text-left">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order: Order, index: number) => (
                    <tr
                      key={order.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="border border-blue-300 px-4 py-2">
                        {new Date(order.fecha).toLocaleDateString()}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">
                        {order.hora}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">
                        {order.estado}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">
                        COP {order.total.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-blue-300 px-4 py-2 text-center"
                    >
                      No hay pedidos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button
              size="sm"
              color="blue-gray"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}            >
              Anterior
            </Button>
            <div>
              Página {currentPage} de {totalPages}
            </div>
            <Button
              size="sm"
              color="blue-gray"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardOrders;
