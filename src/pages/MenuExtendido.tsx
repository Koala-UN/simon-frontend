import { useEffect, useState } from "react";
import MatrixMenuExtendido from "./MatrixMenuExtendido";
import CardCartList from "../components/CardCartList";
import { InputDefault } from "../components/Input";
import FilterFood from "../components/FilterFood";
import OrderSummary from "../components/OrderSummary.tsx";
import { useParams } from "react-router-dom";
import { PaymentProvider } from "../components/PaymentProvider.tsx";
import { CartItem } from "../types/interfaces.ts";
interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  existencias: number;
  rating: number;
}



function MenuExtendido() {
  const [sortOrder] = useState<string>("A-Z");
  const [cart, setCart] = useState<CartItem[]>([]); // Cart state to manage items in the cart
  const [restaurantName, setRestaurantName] = useState<string>(""); // Restaurant name
  const [dishes, setDishes] = useState<Dish[]>([]); // Dishes state
  const [loading, setLoading] = useState<boolean>(true); // Loading state for dishes
  const [category, setCategory] = useState<string>(""); // State for the selected category
  const { restaurantId } = useParams<{ restaurantId: string }>(); // Get restaurantId from the URL

  // Fetch restaurant name based on restaurantId
  useEffect(() => {
    const fetchRestaurantName = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}`);
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

  // Fetch dishes based on restaurantId
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/dish/restaurant/${restaurantId}`);
        const data = await response.json();

        if (data.status === "success") {
          // Filter the data to include only the required fields
          const filteredDishes: Dish[] = data.data.map((dish: Dish) => ({
            id: dish.id,
            name: dish.name,
            description: dish.description,
            category: dish.category,
            rating: dish.rating,
            categoria: dish.category,
            existencias: dish.existencias,
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

  // Filter dishes based on the selected category
  const filteredDishes = category
    ? dishes.filter((dish) => dish.category.toLowerCase() === category.toLowerCase())
    : dishes;
  // Sorting logic
  const sortedDishes = [...filteredDishes].sort((a, b) => {
    if (sortOrder === "A-Z") return a.name.localeCompare(b.name);
    if (sortOrder === "Z-A") return b.name.localeCompare(a.name);
    return 0;
  });

  // Add to cart function
  const handleAddToCart = (dish: Dish) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dish.id);
      if (existingItem) {
        // Increment the quantity if the item exists
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Add a new item to the cart with quantity 1
      return [...prevCart, { ...dish, quantity: 1 }];
    });
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
      <div className="border-l border-gray-300"></div>
      {/* Right Panel */}
      <div className="w-1/4 p-4 flex flex-col h-full">
        <CardCartList cart={cart} />
        <div className="mt-auto">
          <PaymentProvider>
            <OrderSummary
              totalItems={cart.reduce((total, item) => total + item.quantity, 0)}
              totalPrice={cart.reduce((total, item) => total + item.price * item.quantity, 0)}
            />
          </PaymentProvider>
        </div>
      </div>
    </div>
  );
}

export default MenuExtendido;