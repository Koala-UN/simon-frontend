import { useEffect, useState } from "react";
import MatrixMenuExtendido from "./MatrixMenuExtendido";
import CardCartList from "../components/CardCartList";
import { InputDefault } from "../components/Input";
import FilterFood from "../components/FilterFood";
import OrderSummary from "../components/OrderSummary.tsx";
import { useParams } from "react-router-dom";
import PaymentProvider from "../contexts/PaymentContext";
import { CartItem, Dish } from "../types/interfaces.ts";

function MenuExtendido() {
  const [sortOrder] = useState<string>("A-Z");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const { restaurantId } = useParams<{ restaurantId: string }>();

  /** 📌 Fetch Restaurant Name */
  useEffect(() => {
    const fetchRestaurantName = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${restaurantId}`, {
          credentials: "include",
        }
        );
        const data = await response.json();

        if (data.status === "success") {
          setRestaurantName(data.data.nombre);
        } else {
          console.error("Failed to fetch restaurant name:", data);
          setRestaurantName("Restaurante");
        }
      } catch (error) {
        console.error("Error fetching restaurant name:", error);
        setRestaurantName("Restaurante");
      }
    };

    if (restaurantId) {
      fetchRestaurantName();
    }
  }, [restaurantId]);

  /** 📌 Fetch Dishes */
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dish/restaurant/${restaurantId}`,
          { credentials: "include" }
        );
        const data = await response.json();

        if (data.status === "success") {
          const filteredDishes: Dish[] = data.data.map((dish: Dish) => ({
            id: dish.id,
            nombre: dish.nombre,
            descripcion: dish.descripcion,
            rating: dish.rating,
            categoria: dish.categoria,
            existencias: dish.existencias,
            precio: parseFloat(dish.precio), // Ensure precio is a number
            imageUrl: dish.imageUrl || "https://via.placeholder.com/150", // Fallback for images
          }));
          setDishes(filteredDishes);
        } else {
          console.error("Failed to fetch dishes:", data);
        }
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchDishes();
    }
  }, [restaurantId]);

  /** 📌 Filter and Sort Dishes */
  const filteredDishes = category
    ? dishes.filter((dish) => dish.categoria.toLowerCase() === category.toLowerCase())
    : dishes;

  const sortedDishes = [...filteredDishes].sort((a, b) => {
    if (sortOrder === "A-Z") return a.nombre.localeCompare(b.nombre);
    if (sortOrder === "Z-A") return b.nombre.localeCompare(a.nombre);
    return 0;
  });

  /** 📌 Handle Cart Operations */
  const handleAddToCart = (dish: Dish) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const handleIncrement = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-3/4 p-4 h-full">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-left">{restaurantName}</h2>
          <p className="text-sm text-gray-500 text-left mb-4">
            Realiza tu pedido y reserva con nosotros
          </p>
        </div>
        <div className="w-full h-full">
          <InputDefault />
          <FilterFood setCategory={setCategory} />

          {loading ? (
            <p className="text-center text-gray-500">Cargando platos...</p>
          ) : (
            <MatrixMenuExtendido dishes={sortedDishes} onAddToCart={handleAddToCart} />
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-l border-gray-300"></div>

      {/* Right Panel */}
      <div className="w-1/4 p-4 flex flex-col h-full">
        <CardCartList
          cart={cart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemove={handleRemove}
        />
        <div className="mt-auto">
          <PaymentProvider>
            <OrderSummary
              totalItems={cart.reduce((total, item) => total + item.quantity, 0)}
              totalPrice={cart.reduce((total, item) => total + (parseFloat(item.precio) || 0) * item.quantity, 0)}
            />
          </PaymentProvider>
        </div>
      </div>
    </div>
  );
}

export default MenuExtendido;
