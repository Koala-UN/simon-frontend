import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboardOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const ordersPerPage = 5;
  const navigate = useNavigate();

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const authResponse = await fetch(
          "http://localhost:5000/api/restaurant/auth-status",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const authData = await authResponse.json();

        if (authResponse.ok && authData.authenticated) {
          const restauranteId = authData.user.id;

          const response = await fetch(
            `http://localhost:5000/api/order?restaurantId=${restauranteId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );

          const data = await response.json();

          if (response.ok && Array.isArray(data)) {
            setOrders(data);
            setTotalPages(Math.ceil(data.length / ordersPerPage));
          } else {
            console.error("Error al obtener pedidos:", data);
            setOrders([]);
          }
        } else {
          console.error(
            "Usuario no autenticado o error en auth-status:",
            authData.message || authData
          );
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  // Paginate orders
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-800 text-white p-4">
        <Typography variant="h5" className="font-bold mb-6 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Simon
        </Typography>
        <nav className="space-y-4">
          <div>
            <Typography variant="small" className="uppercase text-blue-300"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Servicios
            </Typography>
            <ul className="space-y-2 mt-2">
              <li
                onClick={() => navigate("/admin/reserve")}
                className="cursor-pointer hover:text-blue-300"
              >
                Reservas
              </li>
              <li
                onClick={() => navigate("/admin/orders")}
                className="cursor-pointer hover:text-blue-300"
              >
                Pedidos
              </li>
              <li
                onClick={() => navigate("/inventory")}
                className="cursor-pointer hover:text-blue-300"
              >
                Inventario
              </li>
            </ul>
          </div>
          <Button size="sm" color="blue" className="w-full mt-6"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Cerrar sesión
          </Button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Typography variant="h5" className="font-bold mb-4"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Pedidos
          </Typography>
          <Typography variant="small" className="text-blue-600 mb-6 block"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Últimos pedidos
          </Typography>

          {/* Table */}
          <div className="overflow-auto">
            <table className="table-auto w-full border-collapse border border-blue-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-blue-300 px-4 py-2 text-left">Fecha</th>
                  <th className="border border-blue-300 px-4 py-2 text-left">Hora</th>
                  <th className="border border-blue-300 px-4 py-2 text-left">Estado</th>
                  <th className="border border-blue-300 px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order: any) => (
                    <tr key={order.id}>
                      <td className="border border-blue-300 px-4 py-2">
                        {new Date(order.fecha).toLocaleDateString()}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">{order.hora}</td>
                      <td className="border border-blue-300 px-4 py-2">{order.estado}</td>
                      <td className="border border-blue-300 px-4 py-2">COP {order.total}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="border border-blue-300 px-4 py-2 text-center">
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
              onClick={() => setCurrentPage((prev) => prev - 1)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Anterior
            </Button>
            <div>
              Página {currentPage} de {totalPages}
            </div>
            <Button
              size="sm"
              color="blue-gray"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardOrders;
