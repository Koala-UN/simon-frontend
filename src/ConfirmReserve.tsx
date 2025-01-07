import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams, useNavigate } from "react-router-dom";

function RestaurantReservation() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("7:00 PM");
  const [guests, setGuests] = useState<number>(4);

  const navigate = useNavigate();
  const availableTimes = ["7:00 PM", "8:45 PM", "9:00 PM"];

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/restaurant/${restaurantId}`);
        const data = await response.json();
        if (data.status === "success") setRestaurant(data.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  const handleConfirmReserveNavigation = () => {
    navigate(`/confirm-reserve/${restaurantId}`, {
      state: {
        restaurantName: restaurant?.nombre,
        date: selectedDate,
        time: selectedTime,
        guests,
      },
    });
  };

  if (!restaurant) {
    return <p className="text-center text-gray-500">Cargando restaurante...</p>;
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
          <Typography variant="h5" className="font-bold text-gray-800">
            RESUMEN DE RESERVACIÓN
          </Typography>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
          <Typography variant="h6" className="font-bold text-gray-900 mb-2">
            {restaurant.nombre}
          </Typography>
          <img
            src={restaurant.image || "https://via.placeholder.com/300x200"}
            alt="Restaurant"
            className="rounded-lg mb-4 w-full object-cover"
          />
          <div className="flex flex-col items-center gap-2 text-gray-700">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>{selectedDate.toDateString()}</span>
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

        <p className="text-center text-gray-600 mb-6">
          Completa la reservación para disfrutar de un buen momento bien preparado
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
            <input
              type="text"
              placeholder="Tus apellidos"
              className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="Tu correo"
              className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / Celular</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-gray-500 bg-gray-200 rounded-l-lg">
                +57
              </span>
              <input
                type="text"
                placeholder="Tu número"
                className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detalles adicionales</label>
            <textarea
              placeholder="Detalles adicionales"
              rows={4}
              className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
            ></textarea>
          </div>
          <Button
            color="red"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleConfirmReserveNavigation}
          >
            <span className="text-center">Guardar reservación</span>
            <FaExternalLinkAlt className="text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RestaurantReservation;
