import { useEffect, useState } from "react";
import MatrixMenuExtendido from "./MatrixMenuExtendido";
import CardCartList from "./CardCartList";
import { InputDefault } from "./Input";
import FilterFood from "./FilterFood";
import OrderSummary from "./OrderSummary.tsx";
import { useParams } from "react-router-dom";
import { PaymentProvider } from "./PaymentProvider.tsx";

function MenuExtendido() {
  const [sortOrder] = useState<string>("A-Z");
  const [cart, setCart] = useState<any[]>([]); // Cart state to manage items in the cart
  const [restaurantName, setRestaurantName] = useState<string>(""); // Restaurant name
  const [dishes, setDishes] = useState<any[]>([]); // Dishes state
  const [loading, setLoading] = useState<boolean>(true); // Loading state for dishes
  const [category, setCategory] = useState<string>(""); // State for the selected category
  const { restaurantId } = useParams(); // Get restaurantId from the URL

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
          const filteredDishes = data.data.map((dish: any) => ({
            id: dish.id,
            name: dish.nombre,
            description: dish.descripcion,
            price: parseFloat(dish.precio), // Parse 'precio' as a number
            categoria: dish.categoria,
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
    ? dishes.filter((dish) => dish.categoria.toLowerCase() === category.toLowerCase())
    : dishes;
  // Sorting logic
  const sortedDishes = [...filteredDishes].sort((a, b) => {
    if (sortOrder === "A-Z") return a.name.localeCompare(b.name);
    if (sortOrder === "Z-A") return b.name.localeCompare(a.name);
    return 0;
  });

  // Add to cart function
  const handleAddToCart = (dish: any) => {
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
