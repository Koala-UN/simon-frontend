import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Matrix } from "./Buscar"; // Asegúrate de que Matrix esté correctamente importado
import LocationRestaurant from "./LocationRestaurant";
import Tags from "./Tags.tsx";

function SearchMenu() {
  const { cityId } = useParams<{ cityId: string }>(); // Obtén cityId de la URL
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Nuevo estado para categorías seleccionadas
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
          const formattedRestaurants = data.data.map((restaurant: any) => ({
            id: restaurant.id,
            name: restaurant.nombre,
            description: restaurant.descripcion,
            imageUrl: restaurant.imageUrl,
            tag: restaurant.categoria, // La categoría del restaurante
            address: restaurant.address.direccion,
            city: restaurant.address.ciudad.nombre,
            onClick: () => handleReserveClick(restaurant.id),
          }));

          setRestaurants(formattedRestaurants);
          setFilteredRestaurants(formattedRestaurants);

          // 🔹 Imprime todos los restaurantes cargados en la consola
          console.log("Restaurantes cargados:", formattedRestaurants.map((r: { id: any; name: any; }) => ({ id: r.id, name: r.name })));
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

  // Aplicar filtros cuando cambien los Tags seleccionados
  useEffect(() => {
    if (selectedTags.length > 0) {
      const filtered = restaurants.filter((restaurant) =>
        selectedTags.includes(restaurant.tag)
      );
      setFilteredRestaurants(filtered);

      // 🔹 Imprime los restaurantes filtrados en la consola
      console.log("Restaurantes filtrados:", filtered.map(r => ({ id: r.id, name: r.name })));
    } else {
      setFilteredRestaurants(restaurants);

      // 🔹 Si no hay filtros, imprime todos los restaurantes
      console.log("Mostrando todos los restaurantes:", restaurants.map(r => ({ id: r.id, name: r.name })));
    }
  }, [selectedTags, restaurants]);

  // Manejo de navegación
  const handleReserveClick = (restaurantId: number) => {
    navigate(`/reserve/${restaurantId}`);
  };

  return (
    <div className="flex">
      {/* Panel izquierdo */}
      <div className="w-1/4 p-4 border-r border-gray-300">
        <LocationRestaurant />
        <Tags onFilterChange={setSelectedTags} />
      </div>

      {/* Panel derecho */}
      <div className="w-3/4 p-4">
        {/* Input de búsqueda */}
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

              // 🔹 Imprime los restaurantes filtrados por búsqueda en la consola
              console.log("Restaurantes filtrados por búsqueda:", filtered.map(r => ({ id: r.id, name: r.name })));
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Lista de restaurantes */}
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
