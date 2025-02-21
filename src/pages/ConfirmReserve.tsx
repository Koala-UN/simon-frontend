import { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import {
  // FaCalendarAlt,
  // FaClock,
  // FaUsers,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

interface FormDataInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cedula: string;
  additionalDetails?: string;
}

function ConfirmReserve() {
  const location = useLocation();
  const {
    restaurantName: initialRestaurantName,
    restaurantImage,
    selectedDate,
    selectedTime,
    guests,
    formData,
    restaurantId,
  } = location.state || {};

  const [restaurantName, setRestaurantName] = useState<string | undefined>(initialRestaurantName);
  const [editableFormData, setEditableFormData] = useState<FormDataInterface>(
    formData || { firstName: "", lastName: "", email: "", phone: "", cedula: "", additionalDetails: "" }
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log("🔍 Parámetros recibidos en ConfirmReserve:", {
      restaurantName,
      restaurantImage,
      selectedDate,
      selectedTime,
      guests,
      formData,
      restaurantId,
    });

    // Si no se recibe `restaurantName`, obtenerlo del backend
    if (!restaurantName && restaurantId) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${restaurantId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setRestaurantName(data.data.nombre);
          } else {
            console.error("❌ Error al obtener el nombre del restaurante:", data);
          }
        })
        .catch((error) => console.error("❌ Error de red al obtener restaurante:", error));
    }
  }, [restaurantName, restaurantId, restaurantImage, selectedDate, selectedTime, guests, formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditableFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservationSubmit = async () => {
    try {
      if (!restaurantId) {
        setErrorMessage("❌ Error: El ID del restaurante es obligatorio.");
        console.error("❌ Error: No se recibió restaurantId.");
        return;
      }

      if (!editableFormData.firstName || !editableFormData.lastName || !editableFormData.email || !editableFormData.phone || !editableFormData.cedula) {
        setErrorMessage("❌ Error: Todos los campos son obligatorios.");
        console.error("❌ Campos vacíos:", editableFormData);
        return;
      }

      const reservationData = {
        fecha: new Date(selectedDate).toISOString().split("T")[0], // Formato YYYY-MM-DD
        hora: selectedTime,
        cantidad: guests,
        restauranteId: restaurantId,
        nombre: `${editableFormData.firstName} ${editableFormData.lastName}`.trim(),
        telefono: editableFormData.phone,
        correo: editableFormData.email,
        cedula: editableFormData.cedula,
      };

      console.log("📤 Enviando reserva a la API:", reservationData);

      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL+"/api/reserve/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservationData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage("✅ ¡Reservación guardada con éxito!");
        setErrorMessage("");
        console.log("✅ Reserva creada correctamente:", responseData);
      } else {
        setErrorMessage(responseData.message || "❌ Error al guardar la reserva.");
        setSuccessMessage("");
        console.error("❌ Error del servidor:", responseData);
      }
    } catch (error) {
      console.error("❌ Error al conectar con el servidor:", error);
      setErrorMessage("❌ Error al conectar con el servidor.");
      setSuccessMessage("");
    }
  };

  if (!restaurantName || !selectedDate || !selectedTime || !guests) {
    console.warn("⚠️ Falta información de la reserva.");
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

        {/* 🔹 Formulario de Datos */}
        <form className="space-y-4">
          {["firstName", "lastName", "email", "phone", "cedula"].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field === "firstName"
                  ? "Nombres"
                  : field === "lastName"
                  ? "Apellidos"
                  : field === "email"
                  ? "Correo electrónico"
                  : field === "phone"
                  ? "Teléfono"
                  : "Cédula"}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={editableFormData[field as keyof FormDataInterface] || ""}
                onChange={handleInputChange}
                placeholder={`Tu ${field}`}
                className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          ))}
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

        {/* 🔹 Mensajes de Éxito/Error */}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default ConfirmReserve;
