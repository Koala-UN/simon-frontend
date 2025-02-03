import React, { useState, useEffect } from "react";
import { Button, Typography, Card } from "@material-tailwind/react";
import {
  FaClock,
  FaUsers,
  FaPizzaSlice,
  FaGlassMartiniAlt,
  FaHamburger,
  FaIceCream,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { MdSoupKitchen, MdEmojiFoodBeverage } from "react-icons/md";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams, useNavigate } from "react-router-dom";

function RestaurantReservation() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [dishes, setDishes] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("18:00");
  const [guests, setGuests] = useState<number>(4);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [capacityMessage, setCapacityMessage] = useState<string>("");

  const navigate = useNavigate();

  const categoryIcons: { [key: string]: React.ReactNode } = {
    Pizzas: <FaPizzaSlice />,
    Bebidas: <FaGlassMartiniAlt />,
    Hamburguesas: <FaHamburger />,
    Postres: <FaIceCream />,
    "Sopas y Cremas": <MdSoupKitchen />,
    "Bebidas Calientes": <MdEmojiFoodBeverage />,
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/restaurant/${restaurantId}`
        );
        const data = await response.json();
        if (data.status === "success") setRestaurant(data.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    const fetchDishes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/dish/restaurant/${restaurantId}`
        );
        const data = await response.json();
        if (data.status === "success") setDishes(data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchRestaurant();
    fetchDishes();
  }, [restaurantId]);

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const handleAvailabilityCheck = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/reserve/capacity/${restaurantId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            time: selectedTime,
            date: selectedDate.toISOString().split("T")[0],
          }),
        }
      );

      const data = await response.json();
      if (data.status === "success" && restaurant) {
        const capacity = data.data;
        if (guests <= capacity) {
          setIsAvailable(true);
          setCapacityMessage(
            guests === capacity
              ? "La capacidad máxima del restaurante será alcanzada."
              : "La capacidad del restaurante es suficiente."
          );
        } else {
          setIsAvailable(false);
          setCapacityMessage(
            "El número de personas excede la capacidad del restaurante."
          );
        }
      } else {
        setIsAvailable(false);
        setCapacityMessage("No se pudo verificar la disponibilidad.");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setIsAvailable(false);
      setCapacityMessage("Ocurrió un error al verificar la disponibilidad.");
    }
  };

  const handleMenuNavigation = () => {
    navigate(`/menu/${restaurantId}`);
  };

  if (!restaurant) {
    return <p className="text-center text-gray-500">Cargando restaurante...</p>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-[90%] max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Left Panel */}
          <div className="col-span-2">
            <Typography variant="h4" className="font-bold mb-2"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {restaurant.nombre}
            </Typography>
            <div className="flex gap-2 mb-4">
              <Button size="sm" color="red"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {restaurant.categoria}
              </Button>
            </div>
            <Typography variant="small" className="text-gray-700 mb-4"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {restaurant.address?.direccion || "Dirección no disponible"}
            </Typography>
            <Typography className="text-gray-600 mb-4"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {restaurant.descripcion || "Descripción no disponible"}
            </Typography>
            <div className="mb-4">
              <img
                src={restaurant.image || "https://via.placeholder.com/800x400"}
                alt="Restaurant"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="flex justify-end mb-4">
              <Button color="blue" onClick={handleMenuNavigation}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Ver Menú completo
              </Button>
            </div>
            <div>
              <div className="space-y-4">
                {dishes.map((dish) => (
                  <Card
                    key={dish.id}
                    className="flex flex-row items-center p-4 shadow-sm border rounded-lg"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mr-4">
                      {categoryIcons[dish.categoria] || (
                        <FaPizzaSlice className="text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Typography
                        variant="h6"
                        className="font-bold truncate"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                      >
                        {dish.nombre}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-gray-500"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                      >
                        COP {dish.precio.toLocaleString()}
                      </Typography>
                    </div>
                    <div className="w-16 h-16 ml-4">
                      <img
                        src={dish.image || "https://via.placeholder.com/80"}
                        alt={dish.nombre}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-1 p-4 border-l">
            <Typography variant="h6" className="font-bold mb-4"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Elija una fecha y hora
            </Typography>
            <div className="mb-6">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={({ date }) =>
                  selectedDate.toDateString() === date.toDateString()
                    ? "bg-red-500 text-white rounded-full"
                    : ""
                }
                tileDisabled={({ date }) => date < new Date()}
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <FaClock />
                  Hora
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <FaUsers />
                  Personas
                </label>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full border rounded px-2 py-1"
                  min={1}
                />
              </div>
              <Button
                size="sm"
                color="blue"
                className="w-full"
                onClick={handleAvailabilityCheck}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Validar disponibilidad
              </Button>
              {isAvailable !== null && (
                <Typography
                  className={`text-center mt-2 ${isAvailable ? "text-green-500" : "text-red-500"}`}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  {capacityMessage}
                </Typography>
              )}
            </div>
            <Button
              color="red"
              className="mt-6 w-full flex items-center justify-center gap-2"
              onClick={() => navigate(`/confirm-reserve/${restaurantId}`, {
                state: {
                  selectedDate: selectedDate.toISOString().split("T")[0],
                  selectedTime,
                  guests,
                  restaurantName: restaurant?.nombre,
                  restaurantImage: restaurant?.image || "https://via.placeholder.com/800x400",
                  restaurantId,
                },
              })}
              disabled={!isAvailable}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <span className="text-center">Hacer reservación</span>
              <FaExternalLinkAlt className="text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantReservation;
