import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Matrix } from "./Buscar"; // Asegúrate de que Matrix esté correctamente importado
import LocationRestaurant from "./LocationRestaurant";
import Tags from "./Tags.tsx";
import Filter from "./Filter";

function SearchMenu() {
  const { cityId } = useParams<{ cityId: string }>(); // Obtén cityId de la URL como string
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const navigate = useNavigate();

  // Fetch data from the API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/restaurant?cityId=${cityId}`
        );
        if (!response.ok) {
          throw new Error("Error al cargar restaurantes.");
        }
        const data = await response.json();
        if (data.status === "success") {
          // Map the API data to the format expected by Matrix
          const formattedRestaurants = data.data.map((restaurant: any) => ({
            id: restaurant.id,
            name: restaurant.nombre,
            description: restaurant.descripcion,
            imageUrl: restaurant.imageUrl,
            tag: restaurant.categoria,
            address: restaurant.address.direccion,
            city: restaurant.address.ciudad.nombre,
            onClick: () => handleReserveClick(restaurant.id), // Define onClick action
          }));
          setRestaurants(formattedRestaurants);
          setFilteredRestaurants(formattedRestaurants); // Set initial filtered list
        } else {
          console.warn("No restaurants found.");
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error al cargar restaurantes:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    if (cityId) fetchRestaurants();
  }, [cityId]);

  // Handle navigation to the reserve page
  const handleReserveClick = (restaurantId: number) => {
    navigate(`/reserve/${restaurantId}`);
  };

  // Handle search input changes
  const handleSearch = (searchTerm: string) => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div className="flex">
      {/* Panel izquierdo */}
      <div className="w-1/4 p-4 border-r border-gray-300">
        <LocationRestaurant />
        <Tags />
      </div>

      {/* Panel derecho */}
      <div className="w-3/4 p-4">
        {/* Input de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar restaurante..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Filtro */}
        {/* <Filter />*/}


        {/* Lista de restaurantes */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando restaurantes...</p>
        ) : filteredRestaurants.length > 0 ? (
          <Matrix
            restaurants={filteredRestaurants.map((restaurant) => ({
              ...restaurant,
            }))}
          />
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
