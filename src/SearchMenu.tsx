import { Matrix } from "./Buscar";
import LocationRestaurant from "./LocationRestaurant";
import Tags from "./Tags.tsx";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";


function SearchMenu() {
  const [sortOrder, setSortOrder] = useState<string>("A-Z"); // Sorting state
  const [restaurants, setRestaurants] = useState<any[]>([]); // Restaurants data
  const [, setSearchTerm] = useState<string>(""); // Search filter state
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const navigate = useNavigate(); // React Router navigation

  // Fetch restaurants from the API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/restaurant");
        const data = await response.json();

        if (data.status === "success" && data.data.length > 0) {
          const restaurantsWithRatings = data.data.map((restaurant: any) => ({
            id: restaurant.id,
            name: restaurant.nombre,
            rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Random ratings
            priceRange: "$$", // Default placeholder for price range
          }));
          setRestaurants(restaurantsWithRatings);
        } else {
          console.warn("No restaurants found.");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Handle navigation to the reserve page
  const handleReserveClick = (restaurantId: number) => {
    console.log("Navigating to restaurant ID:", restaurantId); // Debug log
    navigate(`/reserve/${restaurantId}`);
  };

  return (
    
    <div className="flex">
      
      {/* Left Panel */}
      <div className="w-1/4 p-4 border-r border-gray-300">
        <div className="w-full h-full">
          <LocationRestaurant />
          <Tags />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-3/4 p-4">
        <div className="mb-4">
        <input
  type="text"
  placeholder="Buscar restaurante..."
  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value)
  }
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
/>

        </div>
        <Filter setSortOrder={setSortOrder} sortOrder={sortOrder} />
        {loading ? (
          <p className="text-center text-gray-500">Cargando restaurantes...</p>
        ) : restaurants.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron restaurantes.</p>
        ) : (
          <Matrix
            restaurants={restaurants.map((restaurant) => ({
              ...restaurant,
              displayPrice: restaurant.priceRange,
              onClick: () => handleReserveClick(restaurant.id), // Navigate to reserve page
            }))}
          />
        )}
      </div>
    </div>
  );
}

export default SearchMenu;
