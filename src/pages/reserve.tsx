import { useState, useEffect } from "react";
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
import { Dish, FullRestaurant } from "../types/interfaces";
import { Value } from "react-calendar/dist/esm/shared/types.js";
import SimpleImageSlider from "react-simple-image-slider";
import "./../styles/reserve.css";
import "../styles/animations.css";
import "../styles/reserveAnimations.css";

function RestaurantReservation() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<FullRestaurant | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("18:00");
  const [guests, setGuests] = useState<number>(4);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [capacityMessage, setCapacityMessage] = useState<string>("");
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [onlyOneImage, setOnlyOneImage] = useState<boolean>(false);
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
    const fetchImages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${restaurantId}/img`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (data.length === 0) {
          setOnlyOneImage(true);
        }
        setImages(data);
        setImagesLoaded(true);
        console.log("llegaron las imagenes: ", data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${restaurantId}`,
          { credentials: "include" }
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
          `${import.meta.env.VITE_BACKEND_URL}/api/dish/restaurant/${restaurantId}`,
          { credentials: "include" }
        );
        const data = await response.json();
        if (data.status === "success") setDishes(data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchRestaurant();
    fetchDishes();
    fetchImages();
  }, [restaurant?.imageUrl, restaurantId]);

  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      if (value[0] instanceof Date) {
        setSelectedDate(value[0]); // O maneja el rango de fechas según sea necesario
      }
    } else {
      if (value instanceof Date) {
        setSelectedDate(value);
      }
    }
  };

  const handleAvailabilityCheck = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reserve/capacity/${restaurantId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
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

  useEffect(() => {
    if (images.length > 0) {
      console.log("AHORA SIII --> images: ", images[0]);
      setImagesLoaded(true);
    }
  }, [images]);

  if (!restaurant) {
    return <p className="text-center text-gray-500">Cargando restaurante...</p>;
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const [, minutes] = value.split(":").map(Number);
    if (minutes === 0 || minutes === 30) {
      setSelectedTime(value);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen bg-gray-100 p-4 fade-in-reserve">
      <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-6 mb-6 lg:mb-0 lg:mr-4 slide-in-reserve">
        <Typography variant="h4" className="font-bold mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }} children={restaurant.nombre}>
        </Typography>
        <div className="flex gap-2 mb-4">
          <Button size="sm" color="red" onClick={() => {
            console.log("Click en el botón de categoría");
            console.log(" restaurante: ", restaurant);

            window.location.href = `/restaurantes/${restaurant.address.ciudadId}/${restaurant.categoria}`;
          }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }}
            children={restaurant.categoria}>
          </Button>
        </div>
        <Typography variant="small" className="text-gray-700 mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }} children={restaurant.address?.direccion || "Dirección no disponible"}>
        </Typography>
        <Typography className="text-gray-600 mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }} children=
          {restaurant.descripcion || "Descripción no disponible"}>
        </Typography>
        <div className="mb-4">
          <div className="slider-container items-center justify-center mx-auto">
            {onlyOneImage ? (
              <div className="w-full h-full">
                <img
                  src={restaurant?.imageUrl || "https://via.placeholder.com/800x400"}
                  alt="Restaurant"
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
            ) : (
              imagesLoaded && (
                <SimpleImageSlider
                  width="100%"
                  height="100%"
                  images={images.length === 0 ? [{ url: restaurant?.imageUrl || "https://via.placeholder.com/800x400" }] : images}
                  showBullets={true}
                  showNavs={true}
                  autoPlay={true}
                  autoPlayDelay={3}
                  slideDuration={0.5}
                  navStyle={2}
                  bgColor="#f3f3f3"
                  loop={true}
                  startIndex={0}
                />
              )
            )}
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <Button color="blue" onClick={handleMenuNavigation} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }}>
            Ver Menú completo
          </Button>
        </div>
        <div className="space-y-4">
          {dishes.map((dish) => (
            <Card
              key={dish.id}
              className="flex flex-row items-center p-4 shadow-sm border rounded-lg fade-in-reserve" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mr-4">
                {categoryIcons[dish.categoria] || (
                  <FaPizzaSlice className="text-purple-500" />
                )}
              </div>
              <div className="flex-1">
                <Typography variant="h6" className="font-bold truncate" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }}>
                  {dish.nombre}
                </Typography>
                <Typography variant="small" className="text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }}>
                  COP {dish.precio.toLocaleString()}
                </Typography>
              </div>
              <div className="w-16 h-16 ml-4">
                <img
                  src={dish.imageUrl || "https://via.placeholder.com/80"}
                  alt={dish.nombre}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/3 p-4 bg-white rounded-lg shadow-lg slide-in-reserve">
        <Typography variant="h6" className="font-bold mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }}>
          Elija una fecha y hora
        </Typography>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) =>
            selectedDate.toDateString() === date.toDateString()
              ? "bg-red-500 text-white rounded-full"
              : ""
          }
          tileDisabled={({ date }) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
        <div className="space-y-4 mt-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold">
              <FaClock />
              Hora
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full border rounded px-2 py-1"
              list="time-options"
            />
            <datalist id="time-options">
              <option value="00:00" />
              <option value="00:30" />
              <option value="01:00" />
              <option value="01:30" />
              <option value="02:00" />
              <option value="02:30" />
              <option value="03:00" />
              <option value="03:30" />
              <option value="04:00" />
              <option value="04:30" />
              <option value="05:00" />
              <option value="05:30" />
              <option value="06:00" />
              <option value="06:30" />
              <option value="07:00" />
              <option value="07:30" />
              <option value="08:00" />
              <option value="08:30" />
              <option value="09:00" />
              <option value="09:30" />
              <option value="10:00" />
              <option value="10:30" />
              <option value="11:00" />
              <option value="11:30" />
              <option value="12:00" />
              <option value="12:30" />
              <option value="13:00" />
              <option value="13:30" />
              <option value="14:00" />
              <option value="14:30" />
              <option value="15:00" />
              <option value="15:30" />
              <option value="16:00" />
              <option value="16:30" />
              <option value="17:00" />
              <option value="17:30" />
              <option value="18:00" />
              <option value="18:30" />
              <option value="19:00" />
              <option value="19:30" />
              <option value="20:00" />
              <option value="20:30" />
              <option value="21:00" />
              <option value="21:30" />
              <option value="22:00" />
              <option value="22:30" />
              <option value="23:00" />
              <option value="23:30" />
            </datalist>
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
            onClick={handleAvailabilityCheck} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }}>
            Validar disponibilidad
          </Button>
          {isAvailable !== null && (
            <Typography
              className={`text-center mt-2 ${isAvailable ? "text-green-500" : "text-red-500"}`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }}>
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
              restaurantImage: restaurant?.imageUrl || "https://via.placeholder.com/800x400",
              restaurantId,
            },
          })}
          disabled={!isAvailable} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={() => { }}>
          <span className="text-center">Hacer reservación</span>
          <FaExternalLinkAlt className="text-white" />
        </Button>
      </div>
    </div>
  );
}

export default RestaurantReservation;