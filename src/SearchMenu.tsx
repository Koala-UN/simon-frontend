import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Matrix } from "./Buscar"; // Ensure Matrix is correctly imported
import Tags from "./Tags.tsx";

function SearchMenu() {
  const { cityId } = useParams<{ cityId: string }>(); // Get cityId from URL
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Selected categories
  const navigate = useNavigate();

  // Fetch data from the API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/restaurant?cityId=${cityId}`
        );
        if (!response.ok) {
          throw new Error("Error loading restaurants.");
        }
        const data = await response.json();
        if (data.status === "success") {
          const formattedRestaurants = data.data.map((restaurant: any) => ({
            id: restaurant.id,
            name: restaurant.nombre,
            description: restaurant.descripcion,
            imageUrl: restaurant.imageUrl,
            tag: restaurant.categoria, // Restaurant category
            address: restaurant.address.direccion,
            city: restaurant.address.ciudad.nombre,
            onClick: () => handleReserveClick(restaurant.id),
          }));

          setRestaurants(formattedRestaurants);
          setFilteredRestaurants(formattedRestaurants);

          console.log("Loaded restaurants:", formattedRestaurants.map((r) => ({ id: r.id, name: r.name })));
        } else {
          console.warn("No restaurants found.");
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error loading restaurants:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    if (cityId) fetchRestaurants();
  }, [cityId]);

  // Apply filters when selected tags change
  useEffect(() => {
    if (selectedTags.length > 0) {
      const filtered = restaurants.filter((restaurant) =>
        selectedTags.includes(restaurant.tag)
      );
      setFilteredRestaurants(filtered);
      console.log("Filtered restaurants:", filtered.map((r) => ({ id: r.id, name: r.name })));
    } else {
      setFilteredRestaurants(restaurants);
      console.log("Showing all restaurants:", restaurants.map((r) => ({ id: r.id, name: r.name })));
    }
  }, [selectedTags, restaurants]);

  // Handle navigation
  const handleReserveClick = (restaurantId: number) => {
    navigate(`/reserve/${restaurantId}`);
  };

  return (
    <div className="flex w-full overflow-hidden">
      {/* Left Panel */}
      <Tags onFilterChange={setSelectedTags} />

      {/* Right Panel */}
      <div className="flex-1 p-4">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar restaurante..."
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              const filtered = restaurants.filter((restaurant) =>
                restaurant.name.toLowerCase().includes(searchTerm)
              );
              setFilteredRestaurants(filtered);
              console.log("Search filtered restaurants:", filtered.map((r) => ({ id: r.id, name: r.name })));
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Restaurant List */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando restaurantes...</p>
        ) : filteredRestaurants.length > 0 ? (
          <Matrix restaurants={filteredRestaurants} />
        ) : (
          <p className="text-center text-gray-500">
            No se encontraron restaurantes para esta ciudad.
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchMenu;
