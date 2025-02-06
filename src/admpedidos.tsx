import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboardOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const ordersPerPage = 5;
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/restaurant/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Check authentication status and fetch orders
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/restaurant/auth-status",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAuthenticated(data.authenticated);

          if (data.authenticated) {
            const restauranteId = data.user.id;

            // Fetch orders if authenticated
            const ordersResponse = await fetch(
              `http://localhost:5000/api/order?restaurantId=${restauranteId}`,
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
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        navigate("/login");
      }
    };

    checkAuthStatus();
  }, [navigate]);

  // Paginate orders
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  if (authenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h6">Verificando autenticación...</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-blue-800 text-white p-4">
        <Typography variant="h5" className="font-bold mb-6 text-center">
          Admin Dashboard
        </Typography>
        <nav className="space-y-4">
          <div>
            <Typography variant="small" className="uppercase text-blue-300">
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
          <Button
            size="sm"
            color="red"
            className="w-full mt-6"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-full lg:w-3/4 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Typography variant="h5" className="font-bold mb-4">
            Pedidos
          </Typography>
          <Typography variant="small" className="text-blue-600 mb-6 block">
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
                  currentOrders.map((order: any, index: number) => (
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
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Anterior
            </Button>
            <div>
              Página {currentPage} de {totalPages}
            </div>
            <Button
              size="sm"
              color="blue-gray"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardOrders;
