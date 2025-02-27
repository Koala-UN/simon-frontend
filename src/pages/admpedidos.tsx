import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/getContext";
import Sidebar from "../components/Sidebar";
import axios from "axios";

interface Platillo {
  platillo_id: number;  // Cambiado de 'id' a 'platillo_id'
  nombre: string;
  precio: number;
  estado: string;
  cantidad: number;
  total: string;
}

interface Order {
  id: number;
  fecha: string;
  hora: string;
  estado: string;
  total: number;
  platillos: Platillo[];
}

function AdminDashboardOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { isAuthenticated, user } = useAuth();
  const ordersPerPage = 5;
  const navigate = useNavigate();

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

  const cancelOrder = async (pedidoId: number) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/${pedidoId}/cancel`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Order cancelled:", response.data);
      
      // Recargar los pedidos después de cancelar
      const restauranteId = user.id;
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
      }

      // Mostrar alerta de éxito
      alert("Pedido cancelado exitosamente");
      
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Error al cancelar el pedido");
    }
  };

  const markAsDelivered = async (orderId: number, platillos: Platillo[]) => {
    try {
      console.log('Iniciando proceso de marcar como entregado...');
      console.log('Order ID:', orderId);
      console.log('Platillos a actualizar:', platillos);

      // Actualizar cada platillo del pedido
      for (const platillo of platillos) {
        console.log(`Actualizando platillo ${platillo.platillo_id} - ${platillo.nombre}`);
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}/platillo/${platillo.platillo_id}`,
          {
            estado: "ENTREGADO"
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`Respuesta de actualización del platillo ${platillo.platillo_id}:`, response.data);
      }

      console.log('Todos los platillos actualizados, recargando pedidos...');
      // Recargar los pedidos después de actualizar
      const restauranteId = user.id;
      const ordersResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/order?restaurantId=${restauranteId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const ordersData = await ordersResponse.json();
      console.log('Nuevos datos de pedidos:', ordersData);

      if (ordersResponse.ok && Array.isArray(ordersData)) {
        setOrders(ordersData);
        setTotalPages(Math.ceil(ordersData.length / ordersPerPage));
        console.log('Lista de pedidos actualizada exitosamente');
      }

      alert("Pedido marcado como entregado exitosamente");
    } catch (error) {
      console.error("Error detallado al actualizar el pedido:", error);
      console.error("Mensaje de error:", error.response?.data || error.message);
      alert("Error al actualizar el estado del pedido");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h6">Verificando autenticación...</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-50">
      {/* Sidebar */}
      <Sidebar />

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
                  <th className="border border-blue-300 px-4 py-2 text-left">
                    Platillos
                  </th>
                  <th className="border border-blue-300 px-4 py-2 text-left">
                    Acciones
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
                      <td className="border border-blue-300 px-4 py-2">
                        {order.platillos.map((platillo) => (
                          <div key={platillo.platillo_id} className="mb-1">
                            <Typography variant="small">
                              • {platillo.nombre} - COP {platillo.total.toLocaleString()}
                            </Typography>
                          </div>
                        ))}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">
                        {order.estado !== "CANCELADO" && order.estado !== "ENTREGADO" && (
                          <>
                            <Button
                              size="sm"
                              color="red"
                              onClick={() => cancelOrder(order.id)}
                              className="mr-2"
                            >
                              Cancelar Pedido
                            </Button>
                            <Button
                              size="sm"
                              color="green"
                              onClick={() => markAsDelivered(order.id, order.platillos)}
                            >
                              Marcar como Entregado
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
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
