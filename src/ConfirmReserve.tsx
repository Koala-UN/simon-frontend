import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

function ConfirmReserve() {
  const location = useLocation();
  const {
    restaurantName,
    restaurantImage,
    selectedDate,
    selectedTime,
    guests,
    formData,
  } = location.state || {};

  const [editableFormData, setEditableFormData] = useState(formData || {});

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEditableFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleReservationSubmit = () => {
    console.log("Reservación guardada con los datos:", editableFormData);
    alert("Reservación guardada con éxito.");
  };

  if (!restaurantName || !selectedDate || !selectedTime || !guests) {
    return (
      <div className="text-center text-gray-500">
        <p>No se encontró información de la reservación.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <FaExternalLinkAlt className="text-red-500 text-3xl" />
            </div>
          </div>
          <Typography variant="h5" className="font-bold text-gray-800"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            RESUMEN DE RESERVACIÓN
          </Typography>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
          <Typography variant="h6" className="font-bold text-gray-900 mb-2"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {restaurantName}
          </Typography>
          <img
            src={restaurantImage || "https://via.placeholder.com/800x400"}
            alt="Restaurant"
            className="rounded-lg mb-4 w-full object-cover"
          />
          <div className="flex flex-col items-center gap-2 text-gray-700">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>{new Date(selectedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-gray-500" />
              <span>{guests} Personas</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-gray-500" />
              <span>{selectedTime}</span>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombres
            </label>
            <input
              type="text"
              name="firstName"
              value={editableFormData.firstName || ""}
              onChange={handleInputChange}
              placeholder="Tu nombre"
              className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellidos
            </label>
            <input
              type="text"
              name="lastName"
              value={editableFormData.lastName || ""}
              onChange={handleInputChange}
              placeholder="Tus apellidos"
              className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={editableFormData.email || ""}
              onChange={handleInputChange}
              placeholder="Tu correo"
              className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono / Celular
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center px-3  ">
                <img
                  src="https://flagcdn.com/w40/co.png"
                  alt="Colombia"
                  className="w-6 h-4"
                />
                <span className="ml-2">+57</span>
              </div>
              <input
                type="text"
                name="phone"
                value={editableFormData.phone || ""}
                onChange={handleInputChange}
                placeholder="Tu número"
                className="w-full border rounded-r px-3 py-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detalles adicionales
            </label>
            <textarea
              name="additionalDetails"
              value={editableFormData.additionalDetails || ""}
              onChange={handleInputChange}
              placeholder="Detalles adicionales"
              rows={4}
              className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
            ></textarea>
          </div>
          <Button
            color="red"
            className="w-full flex items-center justify-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              handleReservationSubmit();
            } }   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <span>Guardar reservación</span>
            <FaExternalLinkAlt />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmReserve;
