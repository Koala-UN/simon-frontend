import React, { useState, useEffect } from "react";
import { Button, Typography, Card } from "@material-tailwind/react";
import {
  FaCalendarAlt,
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
  const { restaurantId } = useParams<{ restaurantId: string }>(); // Get restaurantId from the URL
  const [restaurant, setRestaurant] = useState<any>(null);
  const [dishes, setDishes] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("7:00 PM");
  const [guests, setGuests] = useState<number>(4);

  const navigate = useNavigate();
  const availableTimes = ["7:00 PM", "8:45 PM", "9:00 PM"];

  const categoryIcons: { [key: string]: React.ReactNode } = {
    Pizzas: <FaPizzaSlice />,
    Bebidas: <FaGlassMartiniAlt />,
    Hamburguesas: <FaHamburger />,
    Postres: <FaIceCream />,
    "Sopas y Cremas": <MdSoupKitchen />,
    "Bebidas Calientes": <MdEmojiFoodBeverage />,
  };

  useEffect(() => {
    // Fetch restaurant information based on restaurantId
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/restaurant/${restaurantId}`);
        const data = await response.json();
        if (data.status === "success") setRestaurant(data.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    // Fetch dishes based on restaurantId
    const fetchDishes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/dish/restaurant/${restaurantId}`);
        const data = await response.json();
        if (data.status === "success") setDishes(data.data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchRestaurant();
    fetchDishes();
  }, [restaurantId]); // Re-run effect when restaurantId changes

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMenuNavigation = () => {
    navigate(`/menu/${restaurantId}`); // Navigate to MenuExtendido with the current restaurant ID
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
            <Typography variant="h4" className="font-bold mb-2">
              {restaurant.nombre}
            </Typography>
            <div className="flex gap-2 mb-4">
              <Button size="sm" color="red">
                {restaurant.categoria}
              </Button>
              <Button size="sm" color="red">
                Bar
              </Button>
            </div>
            <Typography variant="small" className="text-gray-700 mb-4">
              {restaurant.address?.direccion || "Dirección no disponible"}
            </Typography>
            <Typography className="text-gray-600 mb-4">
              {restaurant.descripcion || "Descripción no disponible"}
            </Typography>
            <div className="mb-4">
              <img
                src={restaurant.image || "https://via.placeholder.com/800x400"}
                alt="Restaurant"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="flex justify-center gap-4 mb-4">
              <Button color="red" size="sm" className="px-4 py-2">
                Descripción
              </Button>
              <Button
                color="red"
                size="sm"
                className="px-4 py-2"
                onClick={handleMenuNavigation} // Navigate to MenuExtendido
              >
                Menú
              </Button>
              <Button color="red" size="sm" className="px-4 py-2">
                Ubicación
              </Button>
            </div>
            <div>
              <Typography variant="h6" className="font-bold mb-4">
                Menú
              </Typography>
              <div className="space-y-4">
                {dishes.map((dish) => (
                  <Card
                    key={dish.id}
                    className="flex flex-row items-center p-4 shadow-sm border rounded-lg"
                  >
                    {/* Left Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mr-4">
                      {categoryIcons[dish.categoria] || <FaPizzaSlice className="text-purple-500" />}
                    </div>

                    {/* Middle Section */}
                    <div className="flex-1">
                      <Typography variant="h6" className="font-bold truncate">
                        {dish.nombre}
                      </Typography>
                      <Typography variant="small" className="text-gray-500">
                        COP {dish.precio.toLocaleString()}
                      </Typography>
                    </div>

                    {/* Right Image */}
                    <div className="w-16 h-16 ml-4">
                      <img
                        src={dish.image || "https://via.placeholder.com/80"} // Replace with dish.image if available
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
            <Typography variant="h6" className="font-bold mb-4">
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
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <FaClock />
                  Hora
                </label>
                <div className="flex gap-2 mt-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      size="sm"
                      color={time === selectedTime ? "red" : "gray"}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <Button
  color="red"
  className="mt-6 w-full flex items-center justify-center gap-2"
  onClick={() =>
    navigate(`/confirm-reserve/${restaurantId}`, {
      state: {
        selectedDate,
        selectedTime,
        guests,
        restaurantName: restaurant?.nombre,
      },
    })
  }
>
  <span className="text-center">Hacer pedido</span>
  <FaExternalLinkAlt className="text-white" />
</Button>;
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantReservation;
