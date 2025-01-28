import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function AdminDashboardOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const ordersPerPage = 5;

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => { 
      try {
        const response = await fetch("http://localhost:5000/api/order?restaurantId=1");
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          setOrders(data);
          setTotalPages(Math.ceil(data.length / ordersPerPage));
        } else {
          console.error("Failed to fetch orders:", data);
          setOrders([]); // Handle case where data is not an array
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Ensure orders is an empty array on error
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
        <Typography variant="h5" className="font-bold mb-6 text-center">
          Simon
        </Typography>
        <nav className="space-y-4">
          <div>
            <Typography variant="small" className="uppercase text-blue-300">
              Acceso rápido
            </Typography>
            <ul className="space-y-2 mt-2">
              <li>Inicio</li>
              <li>Historial de pagos</li>
              <li>Mis métodos de pago</li>
              <li>Estadísticas</li>
            </ul>
          </div>
          <div>
            <Typography variant="small" className="uppercase text-blue-300">
              Servicios
            </Typography>
            <ul className="space-y-2 mt-2">
              <li>Menú</li>
              <li>Pedidos</li>
              <li>Mesas</li>
            </ul>
          </div>
          <div>
            <Typography variant="small" className="uppercase text-blue-300">
              Mi cuenta
            </Typography>
            <ul className="space-y-2 mt-2">
              <li>Notificaciones</li>
              <li>Configuración</li>
              <li>Preguntas y respuestas</li>
            </ul>
          </div>
          <Button size="sm" color="blue" className="w-full mt-6">
            Cerrar sesión
          </Button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-6">
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
