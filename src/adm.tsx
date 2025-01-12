import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const reservationsPerPage = 5;

  // Fetch reservations data
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/reserve/");
        const data = await response.json();
        if (data.status === "success") {
          setReservations(data.data);
          setTotalPages(Math.ceil(data.data.length / reservationsPerPage));
        } else {
          console.error("Failed to fetch reservations:", data);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  // Paginate reservations
  const startIndex = (currentPage - 1) * reservationsPerPage;
  const endIndex = startIndex + reservationsPerPage;
  const currentReservations = reservations.slice(startIndex, endIndex);

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
            <Typography variant="small" className="uppercase text-blue-300"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Servicios
            </Typography>
            <ul className="space-y-2 mt-2">
              <li>Menú</li>
              <li>Pedidos</li>
              <li>Mesas</li>
            </ul>
          </div>
          <div>
            <Typography variant="small" className="uppercase text-blue-300"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Mi cuenta
            </Typography>
            <ul className="space-y-2 mt-2">
              <li>Notificaciones</li>
              <li>Configuración</li>
              <li>Preguntas y respuestas</li>
            </ul>
          </div>
          <Button
            size="sm"
            color="blue"
            className="w-full mt-6"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Cerrar sesión
          </Button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Typography variant="h5" className="font-bold mb-4"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Reservas
          </Typography>
          <Typography variant="small" className="text-blue-600 mb-6 block"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Últimas reservas
          </Typography>

          {/* Table */}
          <div className="overflow-auto">
            <table className="table-auto w-full border-collapse border border-blue-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-blue-300 px-4 py-2 text-left">Fecha</th>
                  <th className="border border-blue-300 px-4 py-2 text-left">Nombre</th>
                  <th className="border border-blue-300 px-4 py-2 text-left">Nº Personas</th>
                  <th className="border border-blue-300 px-4 py-2 text-left">Teléfono</th>
                  <th className="border border-blue-300 px-4 py-2 text-left">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {currentReservations.length > 0 ? (
                  currentReservations.map((reservation: any) => (
                    <tr key={reservation.id}>
                      <td className="border border-blue-300 px-4 py-2">
                        {new Date(reservation.fecha).toLocaleDateString()} - {reservation.hora}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">{reservation.nombre}</td>
                      <td className="border border-blue-300 px-4 py-2">{reservation.cantidad}</td>
                      <td className="border border-blue-300 px-4 py-2">{reservation.telefono}</td>
                      <td className="border border-blue-300 px-4 py-2">
                        {reservation.estado}: {reservation.mesaEtiqueta || "Sin mesa asignada"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="border border-blue-300 px-4 py-2 text-center">
                      No hay reservas disponibles.
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

export default AdminDashboard;
